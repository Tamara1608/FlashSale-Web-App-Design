import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { Price } from './ui/Price';
import { StockIndicator } from './ui/StockIndicator';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onBuyClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick, onBuyClick }: ProductCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      <div onClick={() => onProductClick(product)}>
        <div className="aspect-square overflow-hidden bg-gray-50">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          <Price price={product.price} originalPrice={product.originalPrice} size="md" />
          
          <StockIndicator stock={product.stock} maxStock={product.maxStock} size="sm" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick(product);
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium transition-colors"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
        </Button>
      </div>
    </Card>
  );
}