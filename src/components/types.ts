export interface Product {
  id: number; // Changed from string to number to match Long id
  name: string;
  description?: string; // Added description field
  price: number;
  stock: number;
  totalStock: number;
  percentageOff: number;
  imageLink?: string; // Backend field for image URL
  // Frontend-only fields for display (will be calculated)
  originalPrice?: number;
  image?: string; // Keep for backward compatibility
  maxStock?: number; // Keep for backward compatibility
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  userId: number; // Changed from string to number to match Long id
  items: Array<{
    productId: number; // Changed from string to number
    quantity: number;
  }>;
  totalPrice: number;
}


