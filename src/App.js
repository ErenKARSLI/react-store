import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './contexts/CartContext';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/cart">
          Sepet ({totalItems})
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
