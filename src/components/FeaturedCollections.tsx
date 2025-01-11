import React from 'react';

const collections = [
  {
    title: 'Ethnic Collection',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80',
    description: 'Traditional wear with a modern twist'
  },
  {
    title: 'Western Collection',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    description: 'Contemporary styles for the modern woman'
  },
  {
    title: 'Holiday Special',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    description: 'Festive wear for special occasions'
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['Playfair_Display'] text-4xl text-center mb-12 text-[#333333]">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-['Playfair_Display'] text-2xl mb-2">{collection.title}</h3>
                <p className="font-['Montserrat'] text-sm">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}