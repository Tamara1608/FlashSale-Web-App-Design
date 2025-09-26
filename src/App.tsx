import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingBanner } from './components/LandingBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CheckoutConfirmation } from './components/CheckoutConfirmation';
import { Cart } from './components/Cart';
import { UserProfile } from './components/UserProfile';
import { FloatingCartButton } from './components/FloatingCartButton';
import { CartProvider } from './components/hooks/useCart';
import { Product } from './components/types';
import { useProducts } from './components/hooks/useProducts';
import { Toaster } from 'sonner';

type Screen = 'landing' | 'products' | 'checkout' | 'profile';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 79.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1623788728910-23180a99871d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NTg3MjkwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 3,
    maxStock: 50
  },
  {
    id: '2',
    name: 'Latest Smartphone Pro',
    price: 599.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4NzI1ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 12,
    maxStock: 100
  },
  {
    id: '3',
    name: 'Ultra-Thin Gaming Laptop',
    price: 899.99,
    originalPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTg3NzQ0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 7,
    maxStock: 25
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 149.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzU4Njk5MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 0,
    maxStock: 75
  },
  {
    id: '5',
    name: 'Wireless Gaming Controller',
    price: 39.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1694857731920-43e44e75fbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwY29uc29sZXxlbnwxfHx8fDE3NTg4MDE0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 15,
    maxStock: 60
  },
  {
    id: '6',
    name: 'Professional Camera Kit',
    price: 449.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1729857037662-221cc636782a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTg3NzQ0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 5,
    maxStock: 30
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const { products, setProducts } = useProducts();

  // Control body scrolling based on current screen
  useEffect(() => {
    if (currentScreen === 'landing') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentScreen]);

  const handleLogoClick = () => {
    setCurrentScreen('landing');
    setIsModalOpen(false);
    setIsCartOpen(false);
    setCheckoutSuccess(null);
  };

  const handleProfileClick = () => {
    setCurrentScreen('profile');
    setIsModalOpen(false);
    setIsCartOpen(false);
  };

  const handleShopNowClick = () => {
    setCurrentScreen('products');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBuyClick = (product: Product) => {
    setCheckoutProduct(product);
    setIsModalOpen(false);
    
    // Simulate checkout process
    setTimeout(() => {
      if (product.stock > 0) {
        // Success - update stock
        setProducts(prev => prev.map(p => 
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        ));
        setCheckoutSuccess(true);
      } else {
        // Failure - out of stock
        setCheckoutSuccess(false);
      }
      setCurrentScreen('checkout');
    }, 1000);
  };

  const handleBackToProducts = () => {
    setCurrentScreen('products');
    setCheckoutSuccess(null);
    setCheckoutProduct(null);
  };

  const handleBackFromProfile = () => {
    setCurrentScreen('products');
  };

  if (currentScreen === 'checkout') {
    return (
      <CheckoutConfirmation
        isSuccess={checkoutSuccess === true}
        productName={checkoutProduct?.name}
        onBackToProducts={handleBackToProducts}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <UserProfile onBackClick={handleBackFromProfile} />
    );
  }

  return (
    <div className="min-h-screen">
      {currentScreen === 'landing' ? (
        <>
          <Header onLogoClick={handleLogoClick} transparent />
          <LandingBanner onShopNowClick={handleShopNowClick} />
        </>
      ) : (
        <div className="min-h-screen" style={{
          background: 'linear-gradient(135deg, #ffb3ba 0%, #ff9a9e 25%, #fecfef 50%, #fecfef 75%, #ff6b6b 100%)',
          minHeight: '100vh'
        }}>
          <Header 
            onLogoClick={handleLogoClick} 
            onProfileClick={handleProfileClick}
          />
          {currentScreen === 'products' && (
            <ProductGrid
              products={products}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      )}
      
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      
      {currentScreen !== 'landing' && (
        <FloatingCartButton onCartClick={() => setIsCartOpen(true)} />
      )}
      
      <Toaster position="top-right" />
    </div>
  );
}