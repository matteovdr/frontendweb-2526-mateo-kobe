import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Leiding from './pages/Leiding';
import About from './pages/About_us';
import Kampen from './pages/kampen/Kampen';
import AddKamp from './pages/kampen/AddKamp.jsx';
import KampDetail from './pages/kampen/KampDetail.jsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';

import AuthProvider from './contexts/Auth.context.jsx';

import ThemeProvider from './contexts/Theme.context';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: '/', element: <Navigate replace to="/home" /> },
      { path: '/home', element: <Home /> },
      { path: '/leiding', element: <Leiding /> },
      { path: '/about', element: <About /> },
      {
        path: '/kampen',
        children: [
          { index: true, Component: Kampen },
          { path: 'add', Component: AddKamp },
          { path: ':id', Component: KampDetail },

        ],
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      { /* </GoogleOAuthProvider> */}
    </ThemeProvider>
  </StrictMode>,
);
