import { ProductCard } from './ProductCard';
import { Product } from './types';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onBuyClick: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick, onBuyClick }: ProductGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Flash Sale Items</h2>
        <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
            onBuyClick={onBuyClick}
          />
        ))}
      </div>
    </div>
  );
}