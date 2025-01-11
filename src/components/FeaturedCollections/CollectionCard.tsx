import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CollectionCardProps {
  title: string;
  image: string;
  description: string;
  category: string;
}

export default function CollectionCard({ title, image, description, category }: CollectionCardProps) {
  const navigate = useNavigate();

  const handleExplore = () => {
    switch (category) {
      case 'ethnic':
        navigate('/ethnic-wear');
        break;
      case 'western':
        navigate('/western-wear');
        break;
      default:
        navigate('/new-arrivals');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                      flex flex-col justify-end p-8 text-white opacity-90 transition-opacity 
                      group-hover:opacity-100">
        <h3 className="font-playfair text-3xl mb-3">{title}</h3>
        <p className="font-montserrat text-sm mb-4 opacity-90">{description}</p>
        <button 
          onClick={handleExplore}
          className="w-full bg-accent text-charcoal font-semibold py-3 rounded-lg 
                   transform transition-all duration-300 hover:scale-105"
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
}