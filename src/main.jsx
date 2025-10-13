import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Leiding from './components/Leiding';
import About from './components/About_us';
import Kampen from './components/Kampen';
import Inschrijvingen from './components/Inschrijvingen';
import Home from './components/Home';
import Navbar from './components/Navbar';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // jouw frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // als je cookies of tokens meestuurt
}));

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
