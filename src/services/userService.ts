import { ApiClient } from '../config/api';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password?: string; // Usually not returned, but included for completeness
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserOrder {
  id: number;
  item: string;
  date: string;
  price: number;
  status: 'completed' | 'shipped' | 'delivered' | 'pending' | 'cancelled';
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
      const response = await ApiClient.get<UserOrder[]>(`/users/${userId}/orders`);
      return response;
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
