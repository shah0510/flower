import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewArrivals from './pages/NewArrivals';
import EthnicWear from './pages/EthnicWear';
import WesternWear from './pages/WesternWear';
import Sale from './pages/Sale';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import SnowAnimation from './components/backgrounds/SnowAnimation';
import './styles/animations.css';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-white relative">
              <SnowAnimation />
              <div className="relative z-10">
                <Navbar />
                <main className="festive-gradient">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/ethnic-wear" element={<EthnicWear />} />
                    <Route path="/western-wear" element={<WesternWear />} />
                    <Route path="/sale" element={<Sale />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
            <Toaster position="top-center" />
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}