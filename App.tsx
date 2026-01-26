
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DecorativeCircle from './components/DecorativeCircle';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-accent-gold/30">
        <Navbar />
        
        {/* Decorative central element that bridges both halves */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
          <DecorativeCircle />
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
