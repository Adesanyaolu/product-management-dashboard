import { CartItem, Order } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "@mobile_shop_cart";
const ORDERS_KEY = "@mobile_shop_orders";

export const storage = {
  // Cart operations
  async saveCart(items: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  async loadCart(): Promise<CartItem[]> {
    try {
      const data = await AsyncStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  },

  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },

  // Order operations
  async saveOrder(order: Order): Promise<void> {
    try {
      const orders = await this.loadOrders();
      orders.unshift(order); // Add to beginning
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Error saving order:", error);
    }
  },

  async loadOrders(): Promise<Order[]> {
    try {
      const data = await AsyncStorage.getItem(ORDERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading orders:", error);
      return [];
    }
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([CART_KEY, ORDERS_KEY]);
    } catch (error) {
      console.error("Error clearing all data:", error);
    }
  },
};
