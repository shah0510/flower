import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/formatPrice';
import ProductQuantity from '../components/product/ProductQuantity';
import ProductSize from '../components/product/ProductSize';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-primary hover:text-primary/90"
        >
          Return to home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        quantity,
        size: selectedSize
      }
    });
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-playfair mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Size</h3>
            <ProductSize
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Quantity</h3>
            <ProductQuantity
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold
                       hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            <button
              onClick={toggleFavorite}
              className={`
                p-3 rounded-lg border transition-colors
                ${isFavorite(product.id)
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <Heart
                size={24}
                className={isFavorite(product.id) ? 'fill-primary' : ''}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}