import React from 'react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function NewArrivals() {
  return (
    <div>
      <PageHeader 
        title="New Arrivals" 
        description="Discover our latest collection of trendsetting fashion pieces"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}