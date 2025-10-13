import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#004C97] text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">KSA HILLEGEM</h1>
      <div className="space-x-6">
        <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/leiding" className="hover:text-yellow-300 transition">Leiding</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
        <Link to="/kampen" className="hover:text-yellow-300 transition">Kampen</Link>
        <Link to="/inschrijvingen" className="hover:text-yellow-300 transition">Inschrijvingen</Link>
        <Link to="/login" className="hover:text-yellow-300 font-semibold transition">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
