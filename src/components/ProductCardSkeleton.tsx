import { Card } from './ui/card';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-2 bg-gray-100 rounded w-full" />
      </div>
      <div className="px-4 pb-4">
        <div className="h-10 bg-gray-100 rounded" />
      </div>
    </Card>
  );
}


