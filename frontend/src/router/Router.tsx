import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from '@/App';
import Home from '@/pages/Home';
import routes from './routes';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route index={true} path={routes.root} element={<Home />} />
      <Route path={routes.product} element={<ProductPage />} />
      <Route path={routes.cart} element={<CartPage />} />
      <Route path={routes.login} element={<LoginPage />} />
    </Route>
  )
);
