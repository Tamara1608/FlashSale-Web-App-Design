import { useState, useEffect } from 'react';
import { UserService, UserResponse, UserOrder } from '../../services/userService';

export interface UserData {
  fullName: string; // Mock field for frontend display
  username: string;
  email: string;
  profilePicture: string; // Mock field for frontend display
}

export function useUserProfile(userId: number = 1) {
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe', // Mock value
    username: 'johndoe123',
    email: 'john.doe@example.com',
    profilePicture: '' // Mock value
  });
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile and orders in parallel
        const [userResponse, ordersResponse] = await Promise.all([
          UserService.getUserProfile(userId),
          UserService.getUserOrders(userId)
        ]);

        setUserData({
          fullName: 'John Doe', // Mock value since backend doesn't have this field
          username: userResponse.username,
          email: userResponse.email,
          profilePicture: '' // Mock value since backend doesn't have this field
        });

        setOrders(ordersResponse);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
        
        // Fallback to mock data if API fails
        setOrders([
          {
            id: '1',
            item: 'Premium Wireless Headphones',
            date: 'January 15, 2024',
            price: 79.99,
            status: 'delivered'
          },
          {
            id: '2',
            item: 'Latest Smartphone Pro',
            date: 'February 01, 2024',
            price: 599.99,
            status: 'shipped'
          },
          {
            id: '3',
            item: 'Ultra-Thin Gaming Laptop',
            date: 'March 10, 2024',
            price: 899.99,
            status: 'completed'
          },
          {
            id: '4',
            item: 'Smart Fitness Watch',
            date: 'April 05, 2024',
            price: 149.99,
            status: 'delivered'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateUserData = async (updatedData: Partial<UserData>): Promise<boolean> => {
    try {
      const response = await UserService.updateUser(userId, updatedData);
      
      setUserData(prev => ({
        ...prev,
        ...updatedData
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to update user data:', error);
      return false;
    }
  };

  return {
    userData,
    orders,
    loading,
    error,
    updateUserData
  };
}
