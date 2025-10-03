import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Edit3, Save, X, ShoppingBag, Calendar, DollarSign } from 'lucide-react';
import { useUserProfile } from './hooks/useUserProfile';
import { IconAvatar } from './ui/IconAvatar';

interface UserData {
  fullName: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface Order {
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
    };
  }>;
}

interface UserProfileProps {
  onBackClick: () => void;
}

// Custom Avatar Component
function CustomAvatar({ 
  className = "", 
  imageUrl, 
  username 
}: { 
  className?: string;
  imageUrl?: string;
  username?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${username}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function UserProfile({ onBackClick }: UserProfileProps) {
  const { userData, orders, loading, error, updateUserData } = useUserProfile();
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

  const handleSave = async () => {
    try {
      const updateData: any = {
        username: editForm.username,
        email: editForm.email,
      };
      
      // Only include password if it's not empty
      if (editForm.password.trim() !== '') {
        updateData.password = editForm.password;
      }
      
      const success = await updateUserData(updateData);
      
      if (success) {
        setEditForm(prev => ({ ...prev, password: '' }));
        setIsEditing(false);
      } else {
        console.error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'shipped': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'completed': return 'text-green-700 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✓';
      case 'shipped': return '🚚';
      case 'completed': return '✓';
      case 'pending': return '⏳';
      case 'cancelled': return '✗';
      default: return '•';
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
              <CustomAvatar 
                className="w-24 h-24" 
                imageUrl={userData.profilePicture}
                username={userData.username}
              />
            </div>

            {/* User Information */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 space-y-1">
                <div>
                  <IconAvatar 
                    iconSrc="/icons/woman.png"
                    alt="User Avatar"
                    name={`${userData.firstName} ${userData.lastName}`}
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Nice to have you here, <span className="font-medium text-blue-600">{userData.firstName}</span>! 👋
                  </p>
                </div>
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
                <div className="space-y-2">

              {/* Username */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center shadow-md">
                  <User className="w-6 h-6" style={{ color: 'gray' }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium text-gray-900">{userData.username}</p>
                </div>
                  </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5" style={{ color: 'gray' }} />
                  </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{userData.email}</p>
                </div>
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

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-2">Error loading orders</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders found</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="relative p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">#{order.id}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">Order #{order.id}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.orderDate)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-lg font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                        <DollarSign className="w-5 h-5" />
                        ${order.totalPrice.toFixed(2)}
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)} flex items-center gap-2`}>
                        <span className="text-lg">{getStatusIcon(order.status)}</span>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  {order.items && order.items.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Items ({order.items.length}):</h4>
                      {order.items.map((item, index) => {
                        // Calculate original price from percentage off
                        const originalPrice = item.product.percentageOff > 0 
                          ? item.product.price / (1 - item.product.percentageOff / 100)
                          : item.product.price;

                        return (
                          <div 
                            key={item.id} 
                            className="flex items-center gap-4 py-3 px-4 rounded-lg border"
                            style={{
                              background: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                              borderColor: '#e2e8f0'
                            }}
                          >
                            {/* Product Image */}
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {item.product.imageLink ? (
                                <img 
                                  src={item.product.imageLink} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">📦</span>
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 truncate">{item.product.name}</span>
                                {item.product.percentageOff > 0 && (
                                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                                    -{item.product.percentageOff}%
                    </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="bg-gray-200 px-2 py-1 rounded-full">x{item.quantity}</span>
                                <span className="text-xs">Stock: {item.product.stock}/{item.product.totalStock}</span>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-semibold text-gray-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              {item.product.percentageOff > 0 && originalPrice > item.product.price && (
                                <div className="text-xs text-gray-500 line-through">
                                  ${(originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-gray-400 text-4xl mb-2">📦</div>
                      <div className="text-sm text-gray-500 italic">No items in this order</div>
                  </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
