export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'ethnic' | 'western' | 'accessories';
}