import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '@/components/Rating';
import { useGetProductDetailsQuery } from '@/store/apis/productsApi';
import Loader from '@/components/Loader';
import Message from '@/components/Message';
import { CustomError } from '@/types';

const ProductPage = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery({
    productId: productId,
  });

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
                <ListGroupItem>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product?.countInStock === 0}>
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
