import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (productId: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search products..."
          className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <Search className="absolute right-3 text-gray-400" size={20} />
      </div>

      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSearch(product.id)}
              >
                <div className="flex items-center space-x-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-600 text-sm">{product.category}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}