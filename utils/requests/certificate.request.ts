import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {notionApi} from "@/utils/api/api";
import {NotionDatabaseQueryResponse} from "@/utils/types/notionDatabaseQuery.type";

export function useQueryCertificates():UseQueryResult<NotionDatabaseQueryResponse> {
  return useQuery({
    queryKey: ["databases"],
    queryFn: async () => {
      const response = await notionApi.get("/certificates");
      const {data} = response;
      return data;
    }
  })
}