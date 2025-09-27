import { ApiClient } from '../config/api';

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  fullName?: string;
  profilePicture?: string;
}

export interface UserOrder {
  id: string;
  item: string;
  date: string;
  price: number;
  status: 'completed' | 'shipped' | 'delivered' | 'pending' | 'cancelled';
}

export class UserService {
  static async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await ApiClient.get<UserResponse>(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw new Error(`Failed to fetch user ${id}`);
    }
  }

  static async updateUser(id: string, userData: UpdateUserRequest): Promise<UserResponse> {
    try {
      const response = await ApiClient.put<UserResponse>(`/users/${id}`, userData);
      return response;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw new Error(`Failed to update user ${id}`);
    }
  }

  static async getUserOrders(userId: string): Promise<UserOrder[]> {
    try {
      const response = await ApiClient.get<UserOrder[]>(`/users/${userId}/orders`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error);
      throw new Error(`Failed to fetch orders for user ${userId}`);
    }
  }

  static async getUserProfile(id: string): Promise<UserResponse> {
    try {
      const response = await ApiClient.get<UserResponse>(`/users/${id}/profile`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch user profile ${id}:`, error);
      throw new Error(`Failed to fetch user profile ${id}`);
    }
  }
}
