import { useQuery } from "@tanstack/react-query";
import { credits as fallbackCredits, type Credit } from "@/data/finance";

// Gələcəkdə real backend API URL-ini buraya yazacaqsınız
// const API_URL = "https://api.pultap.az/v1/loans/top";

const fetchTopLoans = async (): Promise<Credit[]> => {
  /* 
  // REAL API ÇAĞIRIŞI (Backend hazır olanda bunu aktivləşdirin):
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Kreditləri yükləmək mümkün olmadı");
  return res.json();
  */

  // Hazırda backend olmadığı üçün real vaxt gecikməsini (network delay) simulyasiya edirik
  return new Promise((resolve) => {
    setTimeout(() => {
      // Backendin edəcəyi işi simulyasiya edirik (sıralama və filter)
      const top = fallbackCredits
        .filter((c) => c.type !== "ipoteka")
        .sort((a, b) => a.rate - b.rate)
        .slice(0, 6);
      resolve(top);
    }, 1000); // 1 saniyəlik yüklənmə simulyasiyası
  });
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
