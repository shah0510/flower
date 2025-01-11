import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-charcoal">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  );
}