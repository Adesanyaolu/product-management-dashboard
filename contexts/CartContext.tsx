import { CartItem, Product } from "@/types";
import { storage } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productSku: string, quantity: number) => void;
  removeItem: (productSku: string) => void;
  clearCart: () => void;
  getItemQuantity: (productSku: string) => number;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await storage.loadCart();
      setItems(savedCart);
      setIsHydrated(true);
    };
    loadCart();
  }, []);

  // Persist cart to storage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      storage.saveCart(items);
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, quantity: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.sku === product.sku
      );

      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map((item) =>
          item.product.sku === product.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Add new item
      return [...currentItems, { product, quantity }];
    });
  };

  const updateQuantity = (productSku: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productSku);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.sku === productSku ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productSku: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.sku !== productSku)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productSku: string): number => {
    const item = items.find((item) => item.product.sku === productSku);
    return item?.quantity || 0;
  };

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getItemQuantity,
    subtotal,
    tax,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
