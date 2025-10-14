import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import Login from './components/login';
import Leiding from './components/Leiding';
import About from './components/About_us';
import Kampen from './components/Kampen';
import Inschrijvingen from './components/Inschrijvingen';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Layout from '../Layout';
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