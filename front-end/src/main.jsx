import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Leiding from './pages/Leiding';
import About from './pages/About_us';
import Kampen from './pages/kampen/Kampen';
import Inschrijvingen from './pages/Inschrijvingen';
import NotFound from './pages/NotFound';
const router = createBrowserRouter([
  {
    Component: Layout, 
    children: [
      {
        path: '/',
        element: <Navigate replace to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/leiding',
        element: <Leiding />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/kampen',
        element: <Kampen />,
      },
      {
        path: '/inschrijvingen',
        element: <Inschrijvingen />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);