import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const { favorites, removeFromFavorites } = useFavorites();
  const { dispatch } = useCart();

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    removeFromFavorites(product.id);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Heart size={24} />
            Favorites
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No favorites yet
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1 bg-accent text-charcoal px-3 py-1 rounded hover:bg-accent/90"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}