import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '@/components/Message';
import { useAppDispatch, useAppSelector } from '@/store';
import React from 'react';
import { ProductType } from '@/types';
import { addToCart } from '@/store/slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  const { cartItems } = cartState;

  const handleAddToCart = async (product: ProductType, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const cartItemsToRender = () => {
    let content: React.ReactNode;

    {
      cartItems.length === 0
        ? (content = (
            <Message>
              Your cart is empty <Link to={'/'}>Go back</Link>
            </Message>
          ))
        : (content = (
            <ListGroup variant='flush'>
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            handleAddToCart(item, parseInt(e.target.value))
                          }>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button type='button' variant='white'>
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ));
    }
    return content;
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItemsToRender()}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={() => {
                  navigate('/');
                }}>
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
