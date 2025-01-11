import React from 'react';
import { Tag } from 'lucide-react';

interface SpecialOfferCardProps {
  title: string;
  discount: number;
  image: string;
  description: string;
}

function SpecialOfferCard({ title, discount, image, description }: SpecialOfferCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Tag size={16} />
          <span className="font-semibold">{discount}% OFF</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-playfair text-2xl mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="w-full bg-accent text-charcoal font-semibold py-3 rounded-xl 
                         transform transition-all duration-300 hover:scale-105 hover:bg-accent/90">
          Shop Now
        </button>
      </div>
    </div>
  );
}

const offers = [
  {
    title: 'Winter Collection',
    discount: 30,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80',
    description: 'Cozy winter wear at amazing prices'
  },
  {
    title: 'Party Dresses',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80',
    description: 'Stunning party wear collection'
  },
  {
    title: 'Accessories',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80',
    description: 'Complete your look with our accessories'
  }
];

export default function SpecialOffers() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#F5F5F5]/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl mb-4 text-charcoal">Special Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exclusive deals on our latest collections
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <SpecialOfferCard key={offer.title} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
}