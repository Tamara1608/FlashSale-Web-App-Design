import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { ProductService } from '../../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedProducts = await ProductService.getAllProducts();
        
        if (isMounted) {
          setProducts(fetchedProducts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch products');
          console.error('Error fetching products:', err);
          
          // Fallback to mock data if API fails
          const mock: Product[] = [
            {
              id: 1,
              name: 'Premium Wireless Headphones',
              price: 79.99,
              originalPrice: 199.99,
              image: 'https://images.unsplash.com/photo-1623788728910-23180a99871d?auto=format&fit=crop&w=1080&q=80',
              stock: 3,
              maxStock: 50,
            },
            {
              id: 2,
              name: 'Latest Smartphone Pro',
              price: 599.99,
              originalPrice: 999.99,
              image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?auto=format&fit=crop&w=1080&q=80',
              stock: 12,
              maxStock: 100,
            },
            {
              id: 3,
              name: 'Ultra-Thin Gaming Laptop',
              price: 899.99,
              originalPrice: 1499.99,
              image: 'https://images.unsplash.com/photo-1754928864131-21917af96dfd?auto=format&fit=crop&w=1080&q=80',
              stock: 7,
              maxStock: 25,
            },
            {
              id: 4,
              name: 'Smart Fitness Watch',
              price: 149.99,
              originalPrice: 299.99,
              image: 'https://images.unsplash.com/photo-1716234479503-c460b87bdf98?auto=format&fit=crop&w=1080&q=80',
              stock: 0,
              maxStock: 75,
            },
            {
              id: 5,
              name: 'Wireless Gaming Controller',
              price: 39.99,
              originalPrice: 79.99,
              image: 'https://images.unsplash.com/photo-1694857731920-43e44e75fbec?auto=format&fit=crop&w=1080&q=80',
              stock: 15,
              maxStock: 60,
            },
            {
              id: 6,
              name: 'Professional Camera Kit',
              price: 449.99,
              originalPrice: 799.99,
              image: 'https://images.unsplash.com/photo-1729857037662-221cc636782a?auto=format&fit=crop&w=1080&q=80',
              stock: 5,
              maxStock: 30,
            },
            {
              id: 7,
              name: 'Bluetooth Speaker',
              price: 89.99,
              originalPrice: 149.99,
              image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1080&q=80',
              stock: 8,
              maxStock: 40,
            },
            {
              id: 8,
              name: 'Tablet Pro Max',
              price: 399.99,
              originalPrice: 699.99,
              image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1080&q=80',
              stock: 6,
              maxStock: 35,
            },
            {
              id: 9,
              name: 'Mechanical Keyboard',
              price: 129.99,
              originalPrice: 199.99,
              image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=1080&q=80',
              stock: 12,
              maxStock: 50,
            },
            {
              id: 10,
              name: 'Gaming Mouse',
              price: 59.99,
              originalPrice: 99.99,
              image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1080&q=80',
              stock: 20,
              maxStock: 80,
            },
            {
              id: 11,
              name: 'Monitor 4K Ultra',
              price: 299.99,
              originalPrice: 499.99,
              image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1080&q=80',
              stock: 4,
              maxStock: 20,
            },
            {
              id: 12,
              name: 'Webcam HD Pro',
              price: 79.99,
              originalPrice: 129.99,
              image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1080&q=80',
              stock: 10,
              maxStock: 45,
            },
            {
              id: 13,
              name: 'Power Bank 20000mAh',
              price: 29.99,
              originalPrice: 49.99,
              image: 'https://images.unsplash.com/photo-1609592807901-0b8b0b8b0b8b?auto=format&fit=crop&w=1080&q=80',
              stock: 25,
              maxStock: 100,
            },
            {
              id: 14,
              name: 'USB-C Hub',
              price: 49.99,
              originalPrice: 79.99,
              image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1080&q=80',
              stock: 18,
              maxStock: 60,
            },
            {
              id: 15,
              name: 'Wireless Charger',
              price: 24.99,
              originalPrice: 39.99,
              image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1080&q=80',
              stock: 30,
              maxStock: 120,
            },
            {
              id: 16,
              name: 'Smart Home Hub',
              price: 199.99,
              originalPrice: 299.99,
              image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1080&q=80',
              stock: 7,
              maxStock: 25,
            },
            {
              id: 17,
              name: 'VR Headset',
              price: 349.99,
              originalPrice: 499.99,
              image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=1080&q=80',
              stock: 3,
              maxStock: 15,
            },
            {
              id: 18,
              name: 'Drone Pro',
              price: 599.99,
              originalPrice: 899.99,
              image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1080&q=80',
              stock: 2,
              maxStock: 10,
            },
            {
              id: 19,
              name: 'Smart Doorbell',
              price: 149.99,
              originalPrice: 199.99,
              image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1080&q=80',
              stock: 9,
              maxStock: 30,
            },
            {
              id: 20,
              name: 'Security Camera',
              price: 89.99,
              originalPrice: 149.99,
              image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1080&q=80',
              stock: 14,
              maxStock: 50,
            },
          ];
          setProducts(mock);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateProductStock = async (productId: number, newStock: number) => {
    try {
      const updatedProduct = await ProductService.updateProductStock(productId, newStock);
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
    } catch (error) {
      console.error('Failed to update product stock:', error);
      // Update locally even if API call fails
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, stock: newStock } : p
      ));
    }
  };

  return { products, setProducts, loading, error, updateProductStock } as const;
}


