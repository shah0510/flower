import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import AddressForm from '../components/checkout/AddressForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';

export default function Checkout() {
  const {
    state,
    currentStep,
    addressData,
    paymentMethod,
    isProcessing,
    handleAddressSubmit,
    handlePaymentMethodSelect,
    handlePlaceOrder,
  } = useCheckout();

  const navigate = useNavigate();

  if (state.items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {currentStep === 'address' ? (
            <>
              <h2 className="text-2xl font-playfair mb-6">Shipping Address</h2>
              <AddressForm onSubmit={handleAddressSubmit} />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-playfair mb-6">Payment Method</h2>
              <PaymentMethod
                selected={paymentMethod}
                onSelect={handlePaymentMethodSelect}
                onPlaceOrder={handlePlaceOrder}
                isProcessing={isProcessing}
                total={state.total}
              />
            </>
          )}
        </div>

        <OrderSummary
          items={state.items}
          total={state.total}
          addressData={addressData}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}