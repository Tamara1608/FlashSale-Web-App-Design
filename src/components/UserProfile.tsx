import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Edit3, Save, X, ShoppingBag, Calendar, DollarSign } from 'lucide-react';

interface UserData {
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface Order {
  id: string;
  itemName: string;
  date: string;
  price: number;
  status: 'completed' | 'shipped' | 'delivered';
}

interface UserProfileProps {
  onBackClick: () => void;
}

// Custom Avatar Component
function CustomAvatar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full bg-pink-400 flex items-center justify-center overflow-hidden">
        {/* Head */}
        <div className="absolute w-16 h-16 bg-amber-100 rounded-full top-2"></div>
        
        {/* Hair */}
        <div className="absolute w-20 h-12 bg-gray-700 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
        
        {/* Body/Shirt */}
        <div className="absolute w-14 h-16 bg-yellow-400 bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-lg">
          {/* Collar */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-t-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function UserProfile({ onBackClick }: UserProfileProps) {
  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    username: 'johndoe123',
    email: 'john.doe@example.com',
    profilePicture: '' // We'll use a custom avatar instead
  });

  // Mock order history
  const [orders] = useState<Order[]>([
    {
      id: '1',
      itemName: 'Premium Wireless Headphones',
      date: '2024-01-15',
      price: 79.99,
      status: 'delivered'
    },
    {
      id: '2',
      itemName: 'Latest Smartphone Pro',
      date: '2024-01-10',
      price: 599.99,
      status: 'shipped'
    },
    {
      id: '3',
      itemName: 'Ultra-Thin Gaming Laptop',
      date: '2024-01-05',
      price: 899.99,
      status: 'completed'
    },
    {
      id: '4',
      itemName: 'Smart Fitness Watch',
      date: '2023-12-28',
      price: 149.99,
      status: 'delivered'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: userData.username,
    email: userData.email,
    password: ''
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling
      setEditForm({
        username: userData.username,
        email: userData.email,
        password: ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      username: editForm.username,
      email: editForm.email
    }));
    setIsEditing(false);
    setEditForm(prev => ({ ...prev, password: '' }));
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #ffb3ba 0%, #ff9a9e 25%, #fecfef 50%, #fecfef 75%, #ff6b6b 100%)',
      minHeight: '100vh'
    }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBackClick}
            className="mb-4 text-gray-700 hover:text-gray-900"
          >
            ← Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        </div>

        {/* Profile Section */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <CustomAvatar className="w-24 h-24" />
            </div>

            {/* User Information */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">{userData.fullName}</h2>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={handleEditToggle}
                  className="flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {!isEditing ? (
                /* Display Mode */
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      <strong>Username:</strong> {userData.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      <strong>Email:</strong> {userData.email}
                    </span>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editForm.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">New Password (optional)</Label>
                    <Input
                      id="password"
                      type="password"
                      value={editForm.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                    style={{
                      backgroundColor: '#16a34a',
                      color: 'white',
                      padding: '8px 24px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Order History */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 mb-2 md:mb-0">
                    <h3 className="font-medium text-gray-900">{order.itemName}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${order.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
