import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types/product';

interface ProductCardProps extends Product {}

export default function ProductCard(props: ProductCardProps) {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: props,
        quantity: 1,
        size: 'M' // Default size
      }
    });
  };

  const toggleFavorite = () => {
    if (isFavorite(props.id)) {
      removeFromFavorites(props.id);
    } else {
      addToFavorites(props);
    }
  };

  const handleClick = () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div 
        className="relative aspect-w-3 aspect-h-4 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={props.image}
          alt={props.name}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-accent transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite(props.id) ? 'fill-primary text-primary' : 'text-gray-600'}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={handleClick}>
          {props.name}
        </h3>
        <p className="text-gray-600 mb-2">{props.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-primary font-bold">{formatPrice(props.price)}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex items-center space-x-2 bg-accent text-charcoal px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}