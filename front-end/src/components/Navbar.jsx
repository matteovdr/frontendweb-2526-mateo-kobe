import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts';
import { useAuth } from '../contexts/auth';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { darkmode, toggleDarkmode } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#004C97] dark:bg-gray-900 text-white p-4 shadow-md transition-colors">
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <button
            onClick={toggleDarkmode}
            className="flex items-center justify-center w-9 h-9 rounded-full border
             border-white/50 hover:bg-white/10 transition"
            aria-label="Toggle dark mode"
          >

            {darkmode ? (
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 3v2.25M18.364 5.636l-1.59 1.59M21 12h-2.25M18.364 18.364l-1.59-1.59M12 
                  18.75V21M7.226 16.774l-1.59 1.59M5.25 12H3M7.226 7.226l-1.59-1.59M12 8.25A3.75
                   3.75 0 1 0 12 15.75 3.75 3.75 0 0 0 12 8.25z"
                />
              </svg>
            ) : (
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"
                />
              </svg>
            )}
          </button>

          <h1 className="text-xl font-bold tracking-wide">KSA HILLEGEM</h1>
        </div>
 
        <div className="flex items-center space-x-4">
          {/* Hamburger menu */}
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

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/home" className="hover:text-yellow-300 transition p-2">Home</Link>
            <Link to="/leiding" className="hover:text-yellow-300 transition p-2">Leiding</Link>
            <Link to="/about" className="hover:text-yellow-300 transition p-2">About Us</Link>
            <Link to="/kampen" className="hover:text-yellow-300 transition p-2">Kampen</Link>
            {user ? (
              <>
                <span className="hover:text-yellow-300 font-semibold transition p-2">
                  {user.voornaam}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-yellow-300 font-semibold transition p-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/home" 
            className="hover:text-yellow-300 transition p-2">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/leiding" 
            className="hover:text-yellow-300 transition p-2">Leiding</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about" 
            className="hover:text-yellow-300 transition p-2">About Us</Link>
          <Link onClick={() => setMenuOpen(false)} to="/kampen" 
            className="hover:text-yellow-300 transition p-2">Kampen</Link>
          {user ? (
            <>
              <span className="hover:text-yellow-300 font-semibold transition p-2">
                {user.voornaam}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link onClick={() => setMenuOpen(false)} to="/login" 
              className="hover:text-yellow-300 font-semibold transition p-2">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
