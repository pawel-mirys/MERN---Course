import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '@/store/apis/productsApi';
import handleError from '@/utils/errorUtils';
import { toast } from 'react-toastify';

const ProductsListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const handleDeleteProduct = (productId: string) => {
    console.log('delete', productId);
  };

  const handleCreateProduct = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(handleError(error));
      }
    }
  };

  return (
    <>
      <Row>
        <Col className='align-items-center'>Products</Col>
        <Col className='text-end'>
          <Button
            className='btn-sm m-3 text-center'
            onClick={handleCreateProduct}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
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
