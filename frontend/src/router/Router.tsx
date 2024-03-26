import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import routes from './routes';
import PrivateRoute from '@/components/PrivateRoute';
import App from '@/App';
import Home from '@/pages/Home';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ShippingPage from '@/pages/ShippingPage';
import PaymentPage from '@/pages/PaymentPage';
import PlaceOrderPage from '@/pages/PlaceOrderPage';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route index={true} path={routes.root} element={<Home />} />
      <Route path={routes.product} element={<ProductPage />} />
      <Route path={routes.cart} element={<CartPage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      
      <Route path='' element={<PrivateRoute />}>
        <Route path={routes.shipping} element={<ShippingPage />} />
        <Route path={routes.payment} element={<PaymentPage />} />
        <Route path={routes.placeOrder} element={<PlaceOrderPage />} />
      </Route>
    </Route>
  )
);
