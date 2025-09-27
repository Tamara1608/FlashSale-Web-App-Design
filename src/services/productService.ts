import { ApiClient } from '../config/api';
import { Product } from '../components/types';

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await ApiClient.get<ProductResponse[]>('/products');
      return response.map(this.mapToProduct);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductById(id: number): Promise<Product> {
    try {
      const response = await ApiClient.get<ProductResponse>(`/products/${id}`);
      return this.mapToProduct(response);
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error(`Failed to fetch product ${id}`);
    }
  }

  static async updateProductStock(id: number, newStock: number): Promise<Product> {
    try {
      const response = await ApiClient.put<ProductResponse>(`/products/${id}/stock`, {
        stock: newStock
      });
      return this.mapToProduct(response);
    } catch (error) {
      console.error(`Failed to update stock for product ${id}:`, error);
      throw new Error(`Failed to update stock for product ${id}`);
    }
  }

  private static mapToProduct(response: ProductResponse): Product {
    // Generate mock values for frontend display
    const originalPrice = response.price * (1.2 + Math.random() * 0.8); // 20-100% markup
    const mockImages = [
      'https://images.unsplash.com/photo-1623788728910-23180a99871d?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1754928864131-21917af96dfd?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1716234479503-c460b87bdf98?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1694857731920-43e44e75fbec?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1729857037662-221cc636782a?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1080&q=80',
    ];
    
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      price: response.price,
      stock: response.stock,
      // Mock frontend-only fields
      originalPrice: Math.round(originalPrice * 100) / 100,
      image: mockImages[response.id % mockImages.length],
      maxStock: response.stock + Math.floor(Math.random() * 50) + 10, // Random max stock
    };
  }
}
