export type CheckoutStep = 'address' | 'payment';
export type PaymentMethod = 'online' | 'cod';

export interface AddressData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}