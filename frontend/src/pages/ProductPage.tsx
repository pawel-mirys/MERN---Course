import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '@/components/Rating';
import { useGetProductDetailsQuery } from '@/store/apis/productsApi';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import { CustomError } from '@/types';
import { useState } from 'react';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery({
    productId: productId,
  });

  const handleAddToCart = () => {
    product && dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const detailsToRender = (): React.ReactNode => {
    let content: JSX.Element = <></>;

    if (isLoading) {
      content = <Loader />;
    } else if (error) {
      if ('status' in error) {
        const errMsg =
          'error' in error
            ? error.error
            : JSON.stringify((error as unknown as CustomError).data.message);
        content = <Message variant='danger'>{errMsg}</Message>;
      }
    } else {
      content = (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {product && (
                  <Rating
                    value={product && product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product?.description}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product && (
                        <strong>
                          {product?.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product && product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(parseFloat(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroupItem>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product?.countInStock === 0}
                    onClick={handleAddToCart}>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      );
    }

    return content;
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {detailsToRender()}
    </>
  );
};

export default ProductPage;
