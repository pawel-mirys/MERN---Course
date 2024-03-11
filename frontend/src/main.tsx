import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '@/assets/styles/bootstrap.custom.css';
import '@/assets/styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from '@/router/Router';
import { store } from '@/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
