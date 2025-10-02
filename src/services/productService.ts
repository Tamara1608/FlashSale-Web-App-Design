import { ApiClient } from '../config/api';
import { Product } from '../components/types';

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number; // This is the original price from DB
  stock: number;
  imageLink: string;
  totalStock: number;
  percentageOff: number;
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
    // response.price is the original price from DB
    const originalPrice = response.price;
    
    // Calculate discounted price based on percentageOff
    const discountedPrice = response.percentageOff > 0 
      ? response.price * (1 - response.percentageOff / 100)
      : response.price;
    
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      price: Number(discountedPrice.toFixed(2)), // Display the discounted price
      stock: response.stock,
      originalPrice: Number(originalPrice.toFixed(2)), // Original price from DB
      imageLink: response.imageLink,
      totalStock: response.totalStock,
      percentageOff: response.percentageOff,
    };
  }
}
