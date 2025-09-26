import { useState, useEffect } from 'react';
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from './hooks/useCart';

interface HeaderProps {
  onLogoClick: () => void;
  saleEndsAt?: Date; // optional override for countdown
  transparent?: boolean; // for landing page
  onCartClick?: () => void; // for cart toggle
  onProfileClick?: () => void; // for profile navigation
}

export function Header({ onLogoClick, saleEndsAt, transparent = false, onCartClick, onProfileClick }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 30 });
  const { getTotalItems } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset to 23:59:59 when it reaches 00:00:00
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <header 
      className={`${transparent ? 'bg-transparent' : 'bg-white'} px-4 py-4 md:px-6`}
      style={{
        backgroundColor: transparent ? 'transparent' : 'white',
        padding: '16px 24px'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FlashSale</span>
        </button>
        
        <div 
          className="flex items-center space-x-8"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px'
          }}
        >
          <div 
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '9999px'
            }}
          >
            <span 
              className="text-sm font-medium"
              style={{
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Sale ends in:
            </span>
            <div 
              className="flex items-center space-x-1 font-mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'monospace'
              }}
            >
              <span 
                className="bg-white text-red-600 px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: 'white',
                  color: '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {formatTime(timeLeft.hours)}
              </span>
              <span style={{ color: 'white' }}>:</span>
              <span 
                className="bg-white text-red-600 px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: 'white',
                  color: '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {formatTime(timeLeft.minutes)}
              </span>
              <span style={{ color: 'white' }}>:</span>
              <span 
                className="bg-white text-red-600 px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: 'white',
                  color: '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>
          
          {!transparent && onProfileClick && (
            <Button
              onClick={onProfileClick}
              variant="outline"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border-2 border-gray-300 flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginLeft: '32px'
              }}
            >
              <User 
                className="h-5 w-5 text-gray-700" 
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#374151'
                }}
              />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}