
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import Brand from '@/components/Brand';
import Contact from '@/components/Contact';
import DecorativeCircle from '@/components/DecorativeCircle';

// Temporary components for menu and contact until they are built
const Menu = () => <div className="p-20 pt-32 text-white">美味菜單 - 敬請期待</div>;
const Cart = () => <div className="p-20 pt-32 text-white">購物車 - 敬請期待</div>;

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-accent-gold/30 text-white">
        <Navbar />
        
        {/* Decorative central element that bridges both halves */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
          <DecorativeCircle />
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
