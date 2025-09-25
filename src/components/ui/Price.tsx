interface PriceProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function Price({ price, originalPrice, size = 'md' }: PriceProps) {
  const discount = originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  const priceClass = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl';
  const originalClass = size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-sm';

  return (
    <div className="flex items-center space-x-2">
      <span className={`${priceClass} font-bold text-gray-900`}>
        ${price}
      </span>
      {originalPrice ? (
        <>
          <span className={`${originalClass} text-gray-500 line-through`}>
            ${originalPrice}
          </span>
          {discount !== null && (
            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </>
      ) : null}
    </div>
  );
}


