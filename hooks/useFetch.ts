import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

/**
 * Generic fetch function that handles API calls
 */
async function fetchApi<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers = {} } = options;

  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error: ApiError = new Error(`API Error: ${response.statusText}`);
    error.status = response.status;
    try {
      error.data = await response.json();
    } catch {
      error.data = null;
    }
    throw error;
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return {} as TResponse;
  }

  return JSON.parse(text) as TResponse;
}

/**
 * Hook for GET requests with TanStack Query
 */
export function useFetch<TResponse>(
  endpoint: string,
  queryKey: unknown[],
  options?: Omit<UseQueryOptions<TResponse, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<TResponse, ApiError>({
    queryKey,
    queryFn: () => fetchApi<TResponse>(endpoint),
    ...options,
  });
}

/**
 * Hook for fetching a single item by ID
 */
export function useFetchById<TResponse>(
  endpoint: string,
  id: string | undefined,
  queryKey: unknown[],
  options?: Omit<UseQueryOptions<TResponse, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<TResponse, ApiError>({
    queryKey: [...queryKey, id],
    queryFn: () => fetchApi<TResponse>(`${endpoint}/${id}`),
    enabled: !!id,
    ...options,
  });
}

/**
 * Hook for POST requests (create)
 */
export function useCreate<TResponse, TBody>(
  endpoint: string,
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TResponse, ApiError, TBody>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, ApiError, TBody>({
    mutationFn: (data: TBody) =>
      fetchApi<TResponse, TBody>(endpoint, { method: "POST", body: data }),
    onSuccess: () => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    ...options,
  });
}

/**
 * Hook for PUT requests (full update)
 */
export function useUpdate<TResponse, TBody>(
  endpoint: string,
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TResponse, ApiError, { id: string; data: TBody }>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, ApiError, { id: string; data: TBody }>({
    mutationFn: ({ id, data }) =>
      fetchApi<TResponse, TBody>(`${endpoint}/${id}`, { method: "PUT", body: data }),
    onSuccess: () => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    ...options,
  });
}

/**
 * Hook for PATCH requests (partial update)
 */
export function usePatch<TResponse, TBody>(
  endpoint: string,
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TResponse, ApiError, { id: string; data: Partial<TBody> }>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, ApiError, { id: string; data: Partial<TBody> }>({
    mutationFn: ({ id, data }) =>
      fetchApi<TResponse, Partial<TBody>>(`${endpoint}/${id}`, { method: "PATCH", body: data }),
    onSuccess: () => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    ...options,
  });
}

/**
 * Hook for DELETE requests
 */
export function useDelete<TResponse>(
  endpoint: string,
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TResponse, ApiError, string>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, ApiError, string>({
    mutationFn: (id: string) =>
      fetchApi<TResponse>(`${endpoint}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    ...options,
  });
}

// Export the raw fetch function for custom use cases
export { fetchApi };
