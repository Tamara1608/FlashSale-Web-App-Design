import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { useCart } from './hooks/useCart';
import { Trash2, Plus, Minus, ShoppingCart, X, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { OrderConfirmationModal } from './OrderConfirmationModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, createOrder } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    try {
      const success = await createOrder();
      if (success) {
        setShowConfirmation(true); // Show confirmation modal
        onClose(); // Close cart after showing modal
      } else {
        toast.error('❌ Failed to buy items. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error('❌ An error occurred. Please try again.', {
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md sm:max-w-lg bg-white shadow-xl flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold">
              Shopping Cart {getTotalItems() > 0 && `(${getTotalItems()} items)`}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex gap-4 items-center">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="font-medium text-sm text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-red-600 font-medium mb-3">
                        ${item.product.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="flex justify-center">
                        <span className="text-sm text-gray-600">
                          Subtotal: <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <div className="flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 flex-shrink-0 bg-white">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">
                Total ({getTotalItems()} items):
              </span>
              <span className="text-lg font-bold text-red-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            {/* Shipping Note */}
            <p className="text-xs text-gray-500 text-center">
              Shipping and taxes calculated at checkout
            </p>
            
            {/* Buy Button */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
              >
                {isProcessing ? 'Processing...' : 'Buy'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}
