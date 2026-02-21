import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { notionApi } from "@/utils/api/api";
import { NotionDatabaseQueryResponse } from "@/utils/types/notionDatabaseQuery.type";

export function useQueryProducts(): UseQueryResult<NotionDatabaseQueryResponse> {
  return useQuery({
    queryKey: ["databases"],
    queryFn: async () => {
      const response = await notionApi.get("/products");
      const { data } = response;
      return data;
    },
  });
}

export function useGetProductBlocks(pageId: string) {
  return useQuery({
    queryKey: ["blocks"],
    queryFn: async () => {
      const response = await notionApi.get(`/products/${pageId}/blocks`);
      const { data } = response;
      return data;
    },
  });
}

export function useGetProductProperties(pageId: string) {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await notionApi.get(`/products/${pageId}/properties`);
      const { data } = response;
      return data;
    },
  });
}
