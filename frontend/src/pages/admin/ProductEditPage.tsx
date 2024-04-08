import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import FormContainer from '@/components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from '@/store/apis/productsApi';
import handleError from '@/utils/errorUtils';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDesription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery({
    productId: productId,
  });

  const [updateProduct, { isLoading: loadingUpdate, error: updateError }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDesription(product.description);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updateError) {
      toast.error(handleError(updateError));
    } else {
      await updateProduct({
        _id: productId!,
        name: name,
        price: price,
        description: description,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock,
      });
      toast.success('Product Updated');
      navigate('/admin/productlist');
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{handleError(error)}</Message>
        ) : (
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price === 0 ? '' : price.toString()}
                onChange={(e) => {
                  setPrice(parseFloat(e.target.value));
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as={'textarea'}
                placeholder='Enter Description'
                value={description}
                onChange={(e) => {
                  setDesription(e.target.value);
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='In Stock'
                value={countInStock === 0 ? '' : countInStock.toString()}
                onChange={(e) => {
                  setCountInStock(parseInt(e.target.value));
                }}></Form.Control>
              <Button type='submit' variant='primary' className='my-2'>
                Update
              </Button>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
