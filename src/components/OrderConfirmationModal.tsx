import React from 'react';
import { Button } from './ui/button';
import { Check, Zap } from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderConfirmationModal({ 
  isOpen, 
  onClose
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        style={{
          backgroundColor: '#FDF7F9',
          border: '1px solid #FDF7F9'
        }}
      >
        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#E6F7ED'
              }}
            >
              <Check 
                className="w-8 h-8"
                style={{ color: '#34C759' }}
              />
            </div>
          </div>

          {/* Main Heading */}
          <h2 
            className="text-2xl font-bold mb-8"
            style={{ color: '#212121' }}
          >
            Order Confirmed!
          </h2>

          {/* Email Confirmation */}
          <p 
            className="text-sm mb-8"
            style={{ color: '#525252' }}
          >
            You'll receive a confirmation email shortly.
          </p>

          {/* Flash Sale Banner */}
          <div 
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg mb-8"
            style={{
              backgroundColor: '#E6F7ED'
            }}
          >
            <Zap 
              className="w-4 h-4"
              style={{ color: '#34C759' }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: '#34C759' }}
            >
              Thanks for shopping our Flash Sale!
            </span>
          </div>

          {/* Back to Products Button */}
          <Button
            onClick={onClose}
            className="w-full py-3 text-white font-medium rounded-lg"
            style={{
              backgroundColor: '#212121',
              color: '#FFFFFF'
            }}
          >
            Back to Products
          </Button>
        </div>
      </div>
    </div>
  );
}
