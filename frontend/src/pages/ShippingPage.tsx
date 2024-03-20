import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import FormContainer from '@/components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { saveShippingAdress } from '@/store/slices/cartSlice';
import CheckoutSteps from '@/components/CheckoutSteps';

const ShippingPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const { shippingAdress } = cart;

  const [adress, setAdress] = useState(shippingAdress?.adress || '');
  const [city, setCity] = useState(shippingAdress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAdress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAdress?.country || '');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ adress, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='adress' className='my-2'>
          <Form.Label>Adress</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Adress'
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value);
            }}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
