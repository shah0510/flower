import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Traditional Silk Saree',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
    description: 'Handcrafted silk saree with intricate embroidery',
    category: 'ethnic'
  },
  {
    id: '2',
    name: 'Designer Evening Gown',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    description: 'Elegant evening gown perfect for special occasions',
    category: 'western'
  },
  {
    id: '3',
    name: 'Crystal Statement Necklace',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
    description: 'Stunning crystal necklace to complete your look',
    category: 'accessories'
  }
];