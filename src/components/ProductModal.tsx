import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { X, Plus, Minus } from 'lucide-react';
import { Product } from './types';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { Price } from './ui/Price';
import { StockIndicator } from './ui/StockIndicator';
import { useCart } from './hooks/useCart';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    addToCart(product, quantity);
    toast.success(`🛒 ${product.name} added to cart!`, {
      duration: 700,
    });
    setQuantity(1);
    onClose();
  };

  const discountPercentage = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-black">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="p-6 space-y-6 bg-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>
              
              <div className="mb-4">
                <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <span className="text-red-700 font-medium">
                  Save {discountPercentage}% - Limited Time Only!
                </span>
              </div>
            </div>
            
            {/* Stock Level */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Stock Level</span>
                <span className="text-sm font-medium text-red-600">
                  {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left!`}
                </span>
              </div>
              <StockIndicator stock={product.stock} maxStock={product.maxStock} size="md" />
            </div>
            
            {/* Quantity Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <span className="text-xs text-gray-500">(Max: {product.stock})</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 max-w-20">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantity(Math.min(Math.max(1, value), product.stock));
                    }}
                    className="w-full text-center border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-full"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-4 font-medium transition-colors"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}