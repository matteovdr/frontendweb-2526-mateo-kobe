import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { ScrollRestoration } from 'react-router';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className='container-xl flex flex-col min-h-screen'>
      <Navbar />
      <div className='p-4 flex-1'>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
