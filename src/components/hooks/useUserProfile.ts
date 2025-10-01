import { useState, useEffect } from 'react';
import { UserService, UserResponse, UserOrder } from '../../services/userService';
import { useAuth } from './useAuth';

export interface UserData {
  fullName: string; // Mock field for frontend display
  username: string;
  email: string;
  profilePicture: string; // Mock field for frontend display
}

export function useUserProfile() {
  const { userId, user } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    fullName: user?.username || 'User', // Use authenticated user's name
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: '' // Mock value
  });
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Update user data from auth context
        setUserData({
          fullName: user?.username || 'User',
          username: user?.username || '',
          email: user?.email || '',
          profilePicture: ''
        });

        // Fetch real orders from backend
        console.log('Fetching orders for user:', userId);
        const ordersResponse = await UserService.getUserOrders(userId);
        console.log('Orders received:', ordersResponse);
        setOrders(ordersResponse);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
        setOrders([]); // Show empty orders instead of mock data
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, user]);

  const updateUserData = async (updatedData: Partial<UserData>): Promise<boolean> => {
    if (!userId) return false;
    
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
