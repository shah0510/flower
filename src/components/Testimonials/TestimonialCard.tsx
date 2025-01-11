import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  image: string;
}

export default function TestimonialCard({ name, rating, comment, image }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-montserrat font-semibold">{name}</h4>
          <div className="flex text-accent">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={16} fill="#FFD700" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">{comment}</p>
    </div>
  );
}