import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  'About Us': ['Our Story', 'Careers', 'Press'],
  'Customer Service': ['Contact Us', 'Shipping', 'Returns', 'Size Guide'],
  'Quick Links': ['New Arrivals', 'Sale', 'Gift Cards', 'Store Locator'],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-2xl mb-4">MyTaylorZone</h3>
            <p className="text-gray-400 mb-4">
              Elevating fashion with timeless elegance and contemporary style.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-playfair text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MyTaylorZone. All rights reserved.</p>
          <p className="mt-2 text-sm">Created by Ayush Singh</p>
        </div>
      </div>
    </footer>
  );
}