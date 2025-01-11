import React from 'react';
import { CreditCard, Banknote } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

interface PaymentMethodProps {
  selected: 'online' | 'cod';
  onSelect: (method: 'online' | 'cod') => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
  total: number;
}

export default function PaymentMethod({ 
  selected, 
  onSelect, 
  onPlaceOrder,
  isProcessing,
  total 
}: PaymentMethodProps) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => onSelect('online')}
        className={`w-full flex items-center gap-4 p-4 rounded-lg border ${
          selected === 'online' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <CreditCard className={selected === 'online' ? 'text-primary' : 'text-gray-500'} />
        <div className="flex-1 text-left">
          <p className="font-medium">Online Payment</p>
          <p className="text-sm text-gray-500">Pay securely with Stripe</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect('cod')}
        className={`w-full flex items-center gap-4 p-4 rounded-lg border ${
          selected === 'cod' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Banknote className={selected === 'cod' ? 'text-primary' : 'text-gray-500'} />
        <div className="flex-1 text-left">
          <p className="font-medium">Cash on Delivery</p>
          <p className="text-sm text-gray-500">Pay when you receive</p>
        </div>
      </button>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium">Total Amount:</span>
          <span className="text-xl font-semibold text-primary">{formatPrice(total)}</span>
        </div>

        {selected === 'online' ? (
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold
                     hover:bg-primary/90 transition-colors disabled:bg-gray-300
                     disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        ) : (
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold
                     hover:bg-primary/90 transition-colors disabled:bg-gray-300
                     disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Banknote size={20} />
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        )}

        <p className="text-sm text-gray-500 text-center mt-2">
          {selected === 'online' 
            ? 'You will be redirected to Stripe for secure payment'
            : 'You can pay in cash when your order is delivered'}
        </p>
      </div>
    </div>
  );
}