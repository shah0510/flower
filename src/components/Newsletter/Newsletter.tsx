import React from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#F5F5F5]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80')] 
                        bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Join Our Holiday Newsletter
            </h2>
            <p className="font-montserrat text-lg mb-10 max-w-2xl mx-auto">
              Subscribe to receive exclusive offers, new arrivals, and styling tips!
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button className="bg-accent hover:bg-accent/90 text-charcoal px-8 py-4 rounded-xl font-semibold 
                               transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}