import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroButton from './HeroButton';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-cover bg-center bg-fixed" 
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80")'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-4 sm:mb-6 leading-tight">
          Celebrate the Joy <br className="hidden sm:block" /> of Fashion
        </h1>
        <p className="font-montserrat text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-center max-w-2xl">
          Discover our exclusive holiday collection crafted for the modern fashion enthusiast
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row">
          <HeroButton 
            variant="primary"
            onClick={() => navigate('/new-arrivals')}
          >
            Shop Now
          </HeroButton>
          <HeroButton 
            variant="secondary"
            onClick={() => navigate('/ethnic-wear')}
          >
            Explore Collections
          </HeroButton>
        </div>
      </div>
    </div>
  );
}