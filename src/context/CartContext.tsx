import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size?: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size?: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        
        return {
          ...state,
          items: newItems,
          total: state.total + (product.price * quantity)
        };
      }

      const newItem: CartItem = {
        ...product,
        quantity,
        size
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + (product.price * quantity)
      };
    }
    case 'REMOVE_ITEM': {
      const { id, size } = action.payload;
      const itemToRemove = state.items.find(
        item => item.id === id && item.size === size
      );
      
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === id && item.size === size)
        ),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size
      );
      
      if (itemIndex === -1) return state;
      
      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      const newItems = [...state.items];
      newItems[itemIndex] = { ...item, quantity };

      return {
        ...state,
        items: newItems,
        total: state.total + (item.price * quantityDiff)
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}