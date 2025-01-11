import React from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { CartItem } from '../../context/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  addressData: any;
  currentStep: 'address' | 'payment';
}

export default function OrderSummary({ items, total, addressData, currentStep }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-playfair mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary font-bold">{formatPrice(item.price)}</p>
              <div className="text-sm text-gray-600">
                {item.size && <span>Size: {item.size}</span>}
                <span className="ml-2">Qty: {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      {currentStep === 'payment' && addressData && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <div className="text-sm text-gray-600">
            <p>{addressData.fullName}</p>
            <p>{addressData.addressLine1}</p>
            {addressData.addressLine2 && <p>{addressData.addressLine2}</p>}
            <p>{addressData.city}, {addressData.state} {addressData.pincode}</p>
            <p>Phone: {addressData.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}