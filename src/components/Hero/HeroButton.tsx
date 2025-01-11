import React from 'react';

interface HeroButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function HeroButton({ variant, children, onClick }: HeroButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-3 rounded-md font-montserrat font-semibold transition-all duration-300
        ${variant === 'primary' 
          ? 'bg-accent text-charcoal hover:bg-accent/90 hover:scale-105' 
          : 'border-2 border-white text-white hover:bg-white hover:text-charcoal'}
      `}
    >
      {children}
    </button>
  );
}