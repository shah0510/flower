import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, LogOut, ShoppingBag, UserCircle } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

export default function UserMenu({ isOpen, onClose, onOpenCart, onOpenFavorites }: UserMenuProps) {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { state } = useCart();
  const { user, signOut } = useAuth();

  if (!isOpen || !user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
      <div className="px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <UserCircle size={24} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-charcoal truncate">
              Ayush Singh
            </div>
            <div className="text-sm text-gray-500 truncate">
              {user.email}
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleProfile}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
      >
        <User size={18} />
        My Profile
      </button>
      
      <button
        onClick={onOpenCart}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
      >
        <ShoppingBag size={18} />
        Cart ({state.items.length})
      </button>
      
      <button
        onClick={onOpenFavorites}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
      >
        <Heart size={18} />
        Favorites ({favorites.length})
      </button>
      
      <div className="border-t mt-2">
        <button 
          onClick={handleSignOut}
          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-500"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}