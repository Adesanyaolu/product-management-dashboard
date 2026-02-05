export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shippingAddress: ShippingAddress;
  contactInfo: ContactInfo;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  estimatedDelivery?: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
