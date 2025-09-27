import { ApiClient } from '../config/api';
import { Product } from '../components/types';

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: number;
  maxStock: number;
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
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

  static async getProductById(id: string): Promise<Product> {
    try {
      const response = await ApiClient.get<ProductResponse>(`/products/${id}`);
      return this.mapToProduct(response);
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error(`Failed to fetch product ${id}`);
    }
  }

  static async updateProductStock(id: string, newStock: number): Promise<Product> {
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
    return {
      id: response.id,
      name: response.name,
      price: response.price,
      originalPrice: response.originalPrice,
      image: response.image,
      stock: response.stock,
      maxStock: response.maxStock,
    };
  }
}
