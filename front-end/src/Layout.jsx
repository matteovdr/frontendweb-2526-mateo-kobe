import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import { ScrollRestoration } from 'react-router';

export default function Layout() {
  return (
    <div className='container-xl'>
      <Navbar />
      <div className='p-4'>
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
