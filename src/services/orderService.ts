import { ApiClient } from '../config/api';
import { OrderPayload } from '../components/types';

export interface OrderItemResponse {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface OrderResponse {
  id: number;
  orderDate: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  items: OrderItemResponse[];
}

export interface CreateOrderRequest {
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  totalPrice: number;
}

export interface BuyRequest {
  userId: number;
  products: Array<{
    productId: number;
    quantity: number;
  }>;
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

  static async buyFlashSale(buyData: BuyRequest): Promise<boolean> {
    try {
      const response = await ApiClient.post<any>('/flashsale/buy', buyData);
      return true;
    } catch (error) {
      console.error('Failed to buy flash sale items:', error);
      throw new Error('Failed to buy flash sale items');
    }
  }

  static async getOrderById(id: number): Promise<OrderResponse> {
    try {
      const response = await ApiClient.get<OrderResponse>(`/orders/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw new Error(`Failed to fetch order ${id}`);
    }
  }

  static async getUserOrders(userId: number): Promise<OrderResponse[]> {
    try {
      const response = await ApiClient.get<OrderResponse[]>(`/orders/user/${userId}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error);
      throw new Error(`Failed to fetch orders for user ${userId}`);
    }
  }
}
