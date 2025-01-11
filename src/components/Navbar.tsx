import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Heart, X } from 'lucide-react';
import CartSidebar from './cart/CartSidebar';
import UserMenu from './profile/UserMenu';
import FavoritesSidebar from './favorites/FavoritesSidebar';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Ethnic Wear', path: '/ethnic-wear' },
  { name: 'Western Wear', path: '/western-wear' },
  { name: 'Sale', path: '/sale' },
  { name: 'Contact Us', path: '/contact' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const { state } = useCart();
  const { favorites } = useFavorites();
  const { user } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 bg-white z-50 transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-playfair text-xl sm:text-2xl text-primary">
            MyTaylorZone
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-charcoal hover:text-primary transition-all duration-300
                  border-b-2 ${location.pathname === item.path ? 'border-accent' : 'border-transparent'}
                  hover:border-accent px-1 py-2 text-sm lg:text-base
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-charcoal hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className="text-charcoal hover:text-primary transition-colors relative"
              aria-label="Favorites"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-charcoal hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="text-charcoal hover:text-primary transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user ? (
                  <span className="text-sm font-medium">
                    {user.email?.[0].toUpperCase()}
                  </span>
                ) : (
                  <span className="text-sm">?</span>
                )}
              </div>
            </button>

            <UserMenu 
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
              onOpenCart={() => {
                setIsUserMenuOpen(false);
                setIsCartOpen(true);
              }}
              onOpenFavorites={() => {
                setIsUserMenuOpen(false);
                setIsFavoritesOpen(true);
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 touch-target"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-slideDown">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 animate-slideDown">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-playfair text-xl">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="py-4 px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      block px-4 py-3 rounded-lg text-base font-medium touch-target
                      ${location.pathname === item.path 
                        ? 'bg-accent/10 text-primary' 
                        : 'text-charcoal hover:bg-gray-50'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="border-t p-4 space-y-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-2 bg-primary text-white rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Cart
                </span>
                {state.items.length > 0 && (
                  <span className="bg-white text-primary text-sm px-2 py-1 rounded-full">
                    {state.items.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsFavoritesOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-2 bg-accent text-charcoal rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <Heart size={20} />
                  Favorites
                </span>
                {favorites.length > 0 && (
                  <span className="bg-white text-charcoal text-sm px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebars */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesSidebar isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </nav>
  );
}