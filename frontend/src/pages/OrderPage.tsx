import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClitendIdQuery,
} from '@/store/apis/ordersApi';
import handleError from '@/utils/errorUtils';
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import {
  OnApproveActions,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';

import { toast } from 'react-toastify';
import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { SerializedError } from '@reduxjs/toolkit';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery({ orderId: orderId! });

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClitendIdQuery();

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    return actions.order!.capture().then(async (details) => {
      try {
        await payOrder({ orderId: orderId!, details: details });
        refetch();
        toast.success('Payment successful');
      } catch (error) {
        toast.error(handleError(error));
      }
    });
  };

  const onError = (error: SerializedError) => {
    toast.error(handleError(error));
  };

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    const totalPirce = order!.totalPrice.toString();
    return actions.order
      .create({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalPirce,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  // const onApproveTest = async () => {
  //   await payOrder({ orderId: orderId!, details: { payment_source: {} } });
  //   refetch();
  //   toast.success('Payment successful');
  // };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{handleError(error)}</Message>
  ) : !order ? (
    <Message variant='danger'>Order is undefined!</Message>
  ) : (
    <>
      <h1>Order: {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message>
                  Delivered on {order.deliveredAt.toDateString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary:</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}>
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
