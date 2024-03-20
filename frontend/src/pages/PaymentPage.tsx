import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '@/components/FormContainer';
import CheckoutSteps from '@/components/CheckoutSteps';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '@/store/slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const { shippingAdress } = cart;

  useEffect(() => {
    if (!shippingAdress) {
      navigate('/shipping');
    }
  }, [shippingAdress, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2 '
              label='PayPal or Credit Card'
              id='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
