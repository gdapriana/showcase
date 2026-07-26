import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useProjects = (count: number = 6): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["projects", count],
    queryFn: async () => {
      const response = await fetch(`/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });
};
