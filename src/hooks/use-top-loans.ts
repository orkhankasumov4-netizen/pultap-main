import { useQuery } from "@tanstack/react-query";
import { type Credit } from "@/data/finance";
import { apiClient } from "@/api/client";

const fetchTopLoans = async (): Promise<Credit[]> => {
  const credits: Credit[] = await apiClient.get("/credits");
  // Backend-in edəcəyi işi edirik (sıralama və filter)
  return credits
    .filter((c) => c.type !== "ipoteka")
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 6);
};

export const useTopLoans = () => {
  const query = useQuery<Credit[]>({
    queryKey: ["top-loans"],
    queryFn: fetchTopLoans,
    staleTime: 5 * 60 * 1000, // 5 dəqiqə ərzində məlumat təzə sayılır (cache)
    retry: 2, // Xəta olarsa 2 dəfə yenidən yoxla
  });

  return {
    loans: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
