import React from 'react';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

interface ProductSizeProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function ProductSize({ selectedSize, onSizeChange }: ProductSizeProps) {
  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeChange(size)}
          className={`
            w-12 h-12 rounded-full border font-medium
            transition-all duration-200
            ${selectedSize === size 
              ? 'border-primary bg-primary/5 text-primary' 
              : 'border-gray-200 hover:border-gray-300'}
          `}
        >
          {size}
        </button>
      ))}
    </div>
  );
}