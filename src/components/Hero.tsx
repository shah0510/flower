import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80")'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl text-center mb-6">
          Celebrate the Joy of Fashion
        </h1>
        <p className="font-['Montserrat'] text-xl mb-8 text-center">
          Discover our exclusive holiday collection
        </p>
        <div className="space-x-4">
          <button className="bg-[#FFD700] text-[#333333] px-8 py-3 rounded-md font-['Montserrat'] font-semibold hover:transform hover:-translate-y-1 transition-transform">
            Shop Now
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-md font-['Montserrat'] font-semibold hover:bg-white hover:text-[#333333] transition-colors">
            Explore Collections
          </button>
        </div>
      </div>
    </div>
  );
}