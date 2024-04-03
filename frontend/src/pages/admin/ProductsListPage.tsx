import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import { useGetProductsQuery } from '@/store/apis/productsApi';
import handleError from '@/utils/errorUtils';

const ProductsListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const handleDeleteProduct = (productId: string) => {
    console.log('delete', productId);
  };

  return (
    <>
      <Row>
        <Col className='align-items-center'>Products</Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3 text-center'>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{handleError(error)}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      onClick={() => {
                        handleDeleteProduct(product._id);
                      }}
                      variant='light'>
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductsListPage;
