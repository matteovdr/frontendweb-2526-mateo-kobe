import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#004C97] text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">KSA HILLEGEM</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-yellow-300 transition p-2">Home</Link>
          <Link to="/leiding" className="hover:text-yellow-300 transition p-2">Leiding</Link>
          <Link to="/about" className="hover:text-yellow-300 transition p-2">About Us</Link>
          <Link to="/kampen" className="hover:text-yellow-300 transition p-2">Kampen</Link>
          <Link to="/inschrijvingen" className="hover:text-yellow-300 transition p-2">Inschrijvingen</Link>
          <Link to="/login" className="hover:text-yellow-300 font-semibold transition p-2">Login</Link>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          <Link onClick={() => setMenuOpen(false)}
            to="/home" className="hover:text-yellow-300 transition p-2">Home</Link>
          <Link onClick={() => setMenuOpen(false)} 
            to="/leiding" className="hover:text-yellow-300 transition p-2">Leiding</Link>
          <Link onClick={() => setMenuOpen(false)} 
            to="/about" className="hover:text-yellow-300 transition p-2">About Us</Link>
          <Link onClick={() => setMenuOpen(false)} 
            to="/kampen" className="hover:text-yellow-300 transition p-2">Kampen</Link>
          <Link onClick={() => setMenuOpen(false)}
            to="/inschrijvingen" className="hover:text-yellow-300 transition p-2">Inschrijvingen</Link>
          <Link onClick={() => setMenuOpen(false)} 
            to="/login" className="hover:text-yellow-300 font-semibold transition p-2">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;