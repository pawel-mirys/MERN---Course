import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import '@/assets/styles/bootstrap.custom.css';
import '@/assets/styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from '@/router/Router';
import { store } from '@/store';

const CLIENT_ID = import.meta.env.PAYPAL_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        deferLoading={true}
        options={{ clientId: CLIENT_ID, currency: 'USD' }}>
        <RouterProvider router={Router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
