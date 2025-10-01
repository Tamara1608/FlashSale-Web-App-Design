import { ApiClient } from '../config/api';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password?: string; 
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserOrder {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: 'completed' | 'shipped' | 'delivered' | 'pending' | 'cancelled';
  items: Array<{
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      totalStock: number;
      stock: number;
      percentageOff: number;
      imageLink?: string;
    };
  }>;
}

// Backend response structure
export interface BackendOrderResponse {
  id: number;
  orderDate: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  items: Array<{
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      totalStock: number;
      stock: number;
      percentageOff: number;
      imageLink?: string;
    };
  }>;
}

export class UserService {
  static async getUserById(id: number): Promise<UserResponse> {
    try {
      const response = await ApiClient.get<UserResponse>(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw new Error(`Failed to fetch user ${id}`);
    }
  }

  static async updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    try {
      const response = await ApiClient.put<UserResponse>(`/users/${id}`, userData);
      return response;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw new Error(`Failed to update user ${id}`);
    }
  }

  static async getUserOrders(userId: number): Promise<UserOrder[]> {
    try {
      const response = await ApiClient.get<BackendOrderResponse[]>(`/orders/user/${userId}`);
      console.log('Raw backend response:', response);
      
      // Transform backend response to frontend format - one card per order
      const transformedOrders: UserOrder[] = response.map(order => {
        // Calculate total price for the order
        const totalPrice = order.items.reduce((sum, item) => {
          return sum + (item.product.price * item.quantity);
        }, 0);
        
        return {
          id: order.id,
          orderDate: order.orderDate,
          totalPrice: totalPrice,
          status: 'completed', // Default status since backend doesn't provide it
          items: order.items
        };
      });
      
      console.log('Transformed orders:', transformedOrders);
      return transformedOrders;
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error);
      throw new Error(`Failed to fetch orders for user ${userId}`);
    }
  }

  static async getUserProfile(id: number): Promise<UserResponse> {
    try {
      const response = await ApiClient.get<UserResponse>(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch user profile ${id}:`, error);
      throw new Error(`Failed to fetch user profile ${id}`);
    }
  }
}
