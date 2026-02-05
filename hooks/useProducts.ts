import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (search?: string, category?: string) => {
  return useQuery({
    queryKey: ["products", search, category],
    queryFn: () => api.getProducts({ search, category }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
