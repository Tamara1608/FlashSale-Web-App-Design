export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: number;
  maxStock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
}


