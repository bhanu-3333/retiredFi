import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Inheritance from './pages/Inheritance';
import Settings from './pages/Settings';
import './index.css';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/inheritance" element={<Inheritance />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;