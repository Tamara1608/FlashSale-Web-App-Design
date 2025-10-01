import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { Price } from './ui/Price';
import { StockIndicator } from './ui/StockIndicator';
import { Product } from './types';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  // Calculate original price from percentage off
  const originalPrice = product.percentageOff > 0 
    ? product.price / (1 - product.percentageOff / 100)
    : product.originalPrice;

  // Use imageLink from backend
  const imageUrl = product.imageLink;

  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      <div onClick={() => onProductClick(product)}>
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          {/* Percentage Off Badge */}
          {product.percentageOff > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.percentageOff}%
              </div>
            </div>
          )}
          
          <ImageWithFallback
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              product.stock > 0 ? 'group-hover:scale-105' : ''
            }`}
          />
          {product.stock === 0 && (
            <div 
              className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                className="text-center"
                style={{
                  textAlign: 'center'
                }}
              >
                <div 
                  className="text-lg font-bold text-red-600 mb-1"
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#dc2626',
                    marginBottom: '4px'
                  }}
                >
                  Out of Stock
                </div>
                <div 
                  className="text-sm text-gray-500"
                  style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}
                >
                  No items available
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          <Price price={product.price} originalPrice={originalPrice} size="md" />
          
          <StockIndicator stock={product.stock} maxStock={product.totalStock} size="sm" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onProductClick(product);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </div>
    </Card>
  );
}