// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  USER_ORDERS: (userId: string) => `${API_BASE_URL}/orders/user/${userId}`,
  
  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
  USER_PROFILE: (id: string) => `${API_BASE_URL}/users/${id}/profile`,
  
  // Auth (if you have authentication)
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
} as const;

// API Request helper
export class ApiClient {
  private static baseURL = API_BASE_URL;

  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
