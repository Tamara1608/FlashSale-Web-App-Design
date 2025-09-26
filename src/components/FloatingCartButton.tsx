import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './hooks/useCart';

interface FloatingCartButtonProps {
  onCartClick: () => void;
}

export function FloatingCartButton({ onCartClick }: FloatingCartButtonProps) {
  const { getTotalItems } = useCart();

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {getTotalItems() > 0 && (
          <div 
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              animation: 'pulse 2s infinite'
            }}
          >
            {getTotalItems()}
          </div>
        )}
        <Button
          onClick={onCartClick}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            color: 'white',
            border: '4px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#b91c1c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#dc2626';
          }}
        >
          <ShoppingCart 
            style={{
              width: '24px',
              height: '24px',
              color: 'white'
            }}
          />
        </Button>
      </div>
    </div>
  );
}
