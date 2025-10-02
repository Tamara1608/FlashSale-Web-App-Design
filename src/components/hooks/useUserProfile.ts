import { useState, useEffect } from 'react';
import { UserService, UserResponse, UserOrder } from '../../services/userService';
import { useAuth } from './useAuth';

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  profilePicture: string;
}

export function useUserProfile() {
  const { userId, user } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: ''
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

        setUserData({
          firstName: user?.firstName || 'John',
          lastName: user?.lastName || 'Doe',
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
        setOrders([]); 
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
