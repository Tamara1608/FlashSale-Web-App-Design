import { ApiClient, API_ENDPOINTS } from '../config/api';

export interface AuthUser {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  token?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const LOCAL_STORAGE_KEY = 'flashsale_auth_user';

export class AuthService {
  static getUser(): AuthUser | null {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private static setUser(user: AuthUser | null) {
    if (user) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.dispatchEvent(new StorageEvent('storage'));
  }

  static async login(payload: LoginRequest): Promise<AuthUser> {
    try {
      const response = await ApiClient.post<any>(API_ENDPOINTS.LOGIN, payload);
      console.log('Login response:', response);
      
   
      const user: AuthUser = {
        id: response.id || response.userId || 1,
        firstName: response.firstName,
        lastName: response.lastName,
        username: response.username || payload.username,
        email: response.email || '',
        token: response.token
      };
      
      this.setUser(user);
      return user;
    } catch (error: any) {
      if (error.message?.includes('401')) {
        throw new Error('Wrong Credentials Try Again!');
      }
      throw error;
    }
  }

  static async register(payload: SignupRequest): Promise<AuthUser> {
    try {
      const response = await ApiClient.post<any>(API_ENDPOINTS.SIGNUP, payload);
      console.log('Signup response:', response);
      
      const user: AuthUser = {
        id: response.id || response.userId || 1,
        firstName: response.firstName || payload.firstName,
        lastName: response.lastName || payload.lastName,
        username: response.username || payload.username,
        email: response.email || payload.email,
        token: response.token
      };
      
      this.setUser(user);
      return user;
    } catch (error: any) {
      if (error.message?.includes('401')) {
        throw new Error('Wrong Credentials Try Again!');
      }
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await ApiClient.post<void>(API_ENDPOINTS.LOGOUT);
    } catch {
    } finally {
      this.setUser(null);
    }
  }
}


