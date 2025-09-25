import { useEffect, useState } from 'react';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Simulate fetch for now. Replace with real API later.
    const timer = setTimeout(() => {
      if (!isMounted) return;
      const mock: Product[] = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          price: 79.99,
          originalPrice: 199.99,
          image: 'https://images.unsplash.com/photo-1623788728910-23180a99871d?auto=format&fit=crop&w=1080&q=80',
          stock: 3,
          maxStock: 50,
        },
        {
          id: '2',
          name: 'Latest Smartphone Pro',
          price: 599.99,
          originalPrice: 999.99,
          image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?auto=format&fit=crop&w=1080&q=80',
          stock: 12,
          maxStock: 100,
        },
        {
          id: '3',
          name: 'Ultra-Thin Gaming Laptop',
          price: 899.99,
          originalPrice: 1499.99,
          image: 'https://images.unsplash.com/photo-1754928864131-21917af96dfd?auto=format&fit=crop&w=1080&q=80',
          stock: 7,
          maxStock: 25,
        },
      ];
      setProducts(mock);
      setLoading(false);
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { products, setProducts, loading } as const;
}


