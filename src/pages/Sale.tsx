import React from 'react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Sale() {
  // Simulate sale prices by reducing original prices by 30%
  const saleProducts = products.map(product => ({
    ...product,
    price: Math.floor(product.price * 0.7)
  }));

  return (
    <div>
      <PageHeader 
        title="Sale" 
        description="Exclusive deals on premium fashion"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}