import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The quality of clothes is exceptional. My holiday dress received so many compliments!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  },
  {
    name: 'Emily Chen',
    rating: 5,
    comment: 'Perfect fit and amazing customer service. Will definitely shop here again!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
  {
    name: 'Maria Garcia',
    rating: 5,
    comment: 'The ethnic collection is stunning. Love the attention to detail in every piece.',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80'
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair text-4xl text-center mb-12 text-charcoal">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}