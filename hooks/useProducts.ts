import { Category, Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi, useFetch } from "./useFetch";

// Real API hooks using useFetch
export const useProducts = () => {
  return useFetch<Product[]>("products", ["products"], {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (sku: string | undefined) => {
  return useQuery<Product | null>({
    queryKey: ["product", sku],
    queryFn: async () => {
      if (!sku) return null;
      // API returns an array when querying by sku
      const products = await fetchApi<Product[]>(`products?sku=${sku}`);
      return products.length > 0 ? products[0] : null;
    },
    enabled: !!sku,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useFetch<Category[]>("categories", ["categories"], {
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
