import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Product } from './types';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { Price } from './ui/Price';
import { StockIndicator } from './ui/StockIndicator';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: (product: Product) => void;
}

export function ProductModal({ product, isOpen, onClose, onBuyClick }: ProductModalProps) {
  if (!product) return null;

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
          <div className="aspect-square overflow-hidden bg-gray-50">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              
              <div className="mb-4">
                <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <span className="text-red-700 font-medium">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}% 
                  - Limited Time Only!
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Stock Level</span>
              </div>
              <StockIndicator stock={product.stock} maxStock={product.maxStock} size="md" />
            </div>
            
            <Button
              onClick={() => onBuyClick(product)}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-4 font-medium transition-colors"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}