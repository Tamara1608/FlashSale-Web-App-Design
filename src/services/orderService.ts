import { ApiClient } from '../config/api';
import { OrderPayload } from '../components/types';

export interface OrderResponse {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    productName?: string;
    productPrice?: number;
  }>;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
}

export class OrderService {
  static async createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
    try {
      const response = await ApiClient.post<OrderResponse>('/orders', orderData);
      return response;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new Error('Failed to create order');
    }
  }

  static async getOrderById(id: string): Promise<OrderResponse> {
    try {
      const response = await ApiClient.get<OrderResponse>(`/orders/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw new Error(`Failed to fetch order ${id}`);
    }
  }

  static async getUserOrders(userId: string): Promise<OrderResponse[]> {
    try {
      const response = await ApiClient.get<OrderResponse[]>(`/orders/user/${userId}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error);
      throw new Error(`Failed to fetch orders for user ${userId}`);
    }
  }

  static async updateOrderStatus(id: string, status: OrderResponse['status']): Promise<OrderResponse> {
    try {
      const response = await ApiClient.put<OrderResponse>(`/orders/${id}/status`, {
        status
      });
      return response;
    } catch (error) {
      console.error(`Failed to update order status for ${id}:`, error);
      throw new Error(`Failed to update order status for ${id}`);
    }
  }
}
