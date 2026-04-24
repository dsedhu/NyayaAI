import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseInput from './pages/CaseInput';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<CaseInput />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </>
  );
}
