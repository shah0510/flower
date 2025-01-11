import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductQuantity({ quantity, onQuantityChange }: ProductQuantityProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        className="p-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="w-12 text-center font-medium">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="p-2 rounded-full border hover:bg-gray-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}