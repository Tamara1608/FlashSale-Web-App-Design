import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface CheckoutConfirmationProps {
  isSuccess: boolean;
  productName?: string;
  onBackToProducts: () => void;
}

export function CheckoutConfirmation({ 
  isSuccess, 
  productName, 
  onBackToProducts 
}: CheckoutConfirmationProps) {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        {isSuccess ? (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Confirmed!
              </h2>
              {productName && (
                <p className="text-gray-600">
                  Your purchase of <span className="font-medium">{productName}</span> has been confirmed.
                </p>
              )}
              <p className="text-sm text-gray-500">
                You'll receive a confirmation email shortly.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                🎉 Thanks for shopping our Flash Sale!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Out of Stock!
              </h2>
              {productName && (
                <p className="text-gray-600">
                  Sorry, <span className="font-medium">{productName}</span> is no longer available.
                </p>
              )}
              <p className="text-sm text-gray-500">
                This item sold out while you were checking out.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">
                Don't worry - check out our other Flash Sale items!
              </p>
            </div>
          </>
        )}
        
        <Button
          onClick={onBackToProducts}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 font-medium transition-colors"
        >
          Back to Products
        </Button>
      </Card>
    </div>
  );
}