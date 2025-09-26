import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // 4 rows × 4 products per row
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get products for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 text-center relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-red-400 to-pink-400 rounded-lg animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <p 
            className="text-xl font-medium mb-4 tracking-wide"
            style={{
              color: '#3f3f3f',
              fontSize: '20px',
              fontWeight: '500',
              letterSpacing: '0.025em'
            }}
          >
            Limited time offers - grab them before they're gone!
          </p>
          {products.length > 0 && (
            <p className="text-sm text-gray-600 font-semibold bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-lg">
              Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
            </p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.length === 0
          ? Array.from({ length: 16 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}