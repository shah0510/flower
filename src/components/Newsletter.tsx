import React from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="font-playfair text-4xl mb-4">
            Join Our Holiday Newsletter
          </h2>
          <p className="font-montserrat mb-8">
            Subscribe to receive exclusive offers, new arrivals, and styling tips!
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button className="bg-secondary hover:bg-accent text-white hover:text-charcoal px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}