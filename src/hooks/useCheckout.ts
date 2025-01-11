import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { getStripe } from '../lib/stripe';
import { AddressData, CheckoutStep, PaymentMethod } from '../types/checkout';

export function useCheckout() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=/checkout');
    }
  }, [user, navigate]);

  const ensureProfile = async () => {
    if (!user || !addressData) return false;

    try {
      // First check if profile exists
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // If profile doesn't exist, create it
      if (!profile) {
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: addressData.fullName,
          })
          .select()
          .single();

        if (createError) throw createError;
      }

      return true;
    } catch (error) {
      console.error('Error ensuring profile:', error);
      toast.error('Failed to create profile. Please try again.');
      return false;
    }
  };

  const createOrder = async (stripeSessionId?: string) => {
    if (!user || !addressData) return null;

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: state.total,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting',
          delivery_status: 'processing',
          shipping_address: addressData,
          order_items: state.items,
          stripe_session_id: stripeSessionId
        })
        .select()
        .single();

      if (orderError) throw orderError;
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleAddressSubmit = (data: AddressData) => {
    setAddressData(data);
    setCurrentStep('payment');
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please sign in to continue');
      navigate('/signin?redirect=/checkout');
      return;
    }

    if (!addressData) {
      toast.error('Please fill in your address details');
      setCurrentStep('address');
      return;
    }

    try {
      setIsProcessing(true);

      // Ensure profile exists before creating order
      const profileCreated = await ensureProfile();
      if (!profileCreated) {
        throw new Error('Failed to create profile');
      }

      if (paymentMethod === 'online') {
        const stripe = await getStripe();
        if (!stripe) throw new Error('Failed to initialize payment system');

        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: {
            items: state.items,
            address: addressData,
          },
        });

        if (error) throw error;

        // Create order before redirecting to Stripe
        await createOrder(data.id);

        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) throw result.error;
      } else {
        await createOrder();
        dispatch({ type: 'CLEAR_CART' });
        toast.success('Order placed successfully! You can pay on delivery.');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    state,
    currentStep,
    addressData,
    paymentMethod,
    isProcessing,
    handleAddressSubmit,
    handlePaymentMethodSelect,
    handlePlaceOrder,
  };
}