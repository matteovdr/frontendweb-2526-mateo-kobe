import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import Login from './pages/Login';
import Register from './components/Register';
import Leiding from './pages/Leiding';
import About from './pages/About_us';
import Kampen from './pages/Kampen/Kampen';
import AddKamp from './pages/kampen/AddKamp.jsx';
import Inschrijvingen from './pages/Inschrijvingen';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';

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
        children: [
          {
            index: true,
            Component:Kampen,
          },
          {
            path: 'add',
            Component: AddKamp,
          },
        ],
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
        path: '/register',
        element: <Register />,
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