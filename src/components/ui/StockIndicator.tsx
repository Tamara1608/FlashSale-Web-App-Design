interface StockIndicatorProps {
  stock: number;
  maxStock?: number;
  size?: 'sm' | 'md';
}

export function StockIndicator({ stock, maxStock, size = 'md' }: StockIndicatorProps) {
  const isLowStock = stock <= 5;
  const percentage = typeof maxStock === 'number' && maxStock > 0
    ? Math.max(0, Math.min(100, (stock / maxStock) * 100))
    : undefined;

  return (
    <div className="space-y-2">
      {isLowStock ? (
        <p className="text-sm text-red-600 font-medium">Only {stock} left!</p>
      ) : (
        <p className="text-sm text-gray-600">{stock} in stock</p>
      )}

      {typeof percentage === 'number' && (
        <div
          className={`w-full ${size === 'sm' ? 'h-2' : 'h-3'} rounded bg-gray-100 overflow-hidden`}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: isLowStock ? '#dc2626' : '#10b981'
            }}
          />
        </div>
      )}
    </div>
  );
}


