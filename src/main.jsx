import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductsPage from './components/pages/Products';
import NotFoundPage from './components/pages/NotFound';
import SportStoreLayout from './components/layouts/SportStoreLayout';
import LoginPage from './components/pages/Login';
import AdminPanelPage from './components/pages/AdminPanel';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import ProductDetailsPage from './components/pages/ProductDetails';
import CheckoutPage from './components/pages/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SportStoreLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPanelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'producto/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
