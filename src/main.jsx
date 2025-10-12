import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Leiding from './components/Leiding';
import About from './components/About_us';
import Kampen from './components/Kampen';
import Inschrijvingen from './components/Inschrijvingen';

function Navbar() {
  return (
    <nav className="bg-[#004C97] text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">KSA</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/leiding" className="hover:text-yellow-300 transition">Leiding</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
        <Link to="/kampen" className="hover:text-yellow-300 transition">Kampen</Link>
        <Link to="/inschrijvingen" className="hover:text-yellow-300 transition">Inschrijvingen</Link>
        <Link to="/login" className="hover:text-yellow-300 font-semibold transition">Login</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-semibold mb-4 text-[#004C97]">Home</h2>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leiding" element={<Leiding />} />
        <Route path="/about" element={<About />} />
        <Route path="/kampen" element={<Kampen />} />
        <Route path="/inschrijvingen" element={<Inschrijvingen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>,
);
