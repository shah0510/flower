import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, size: string | undefined, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id, size, quantity } 
    });
  };

  const removeItem = (id: string, size: string | undefined) => {
    dispatch({ 
      type: 'REMOVE_ITEM', 
      payload: { id, size } 
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag size={24} />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                    {item.size && (
                      <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
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

        <div className="border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-primary">{formatPrice(state.total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={state.items.length === 0}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     hover:bg-primary/90 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}