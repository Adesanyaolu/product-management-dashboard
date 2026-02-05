import { Category, Product } from "@/types";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Generic fetch helper for the API
async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Use real API
  async getProductsFromApi(): Promise<Product[]> {
    return fetchFromApi<Product[]>("products");
  },

  async getProductFromApi(id: string): Promise<Product> {
    return fetchFromApi<Product>(`products/${id}`);
  },

  async getCategoriesFromApi(): Promise<Category[]> {
    return fetchFromApi<Category[]>("categories");
  },
};
