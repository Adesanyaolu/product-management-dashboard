import { Category, Product } from "@/types";
import { mockCategories, mockProducts } from "./mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getProducts(params?: {
    search?: string;
    category?: string;
  }): Promise<Product[]> {
    await delay(500); // Simulate network delay

    let products = [...mockProducts];

    // Filter by search
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (params?.category && params.category !== "all") {
      products = products.filter((p) => p.category === params.category);
    }

    return products;
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(300);
    return mockProducts.find((p) => p.id === id) || null;
  },

  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },
};
