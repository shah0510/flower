import React from 'react';
import CollectionCard from './CollectionCard';

const collections = [
  {
    title: 'Ethnic Collection',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80',
    description: 'Traditional wear with a modern twist, perfect for celebrations',
    category: 'ethnic'
  },
  {
    title: 'Western Collection',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    description: 'Contemporary styles for the modern woman',
    category: 'western'
  },
  {
    title: 'Holiday Special',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    description: 'Festive wear for special occasions and celebrations',
    category: 'new-arrivals'
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#F5F5F5] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl mb-4 text-charcoal">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed to make you stand out
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.title} {...collection} />
          ))}
        </div>
      </div>
    </section>
  );
}