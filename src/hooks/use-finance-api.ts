import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type { Bank, Credit, Deposit, Card, Currency, Bokt, BoktProduct, Institution } from '@/data/finance';

// ─── Banks ────────────────────────────────────────────
export const useBanks = () =>
  useQuery<Bank[]>({ queryKey: ['banks'], queryFn: () => apiClient.get('/banks') });

// ─── Credits ──────────────────────────────────────────
export const useCredits = () =>
  useQuery<Credit[]>({ queryKey: ['credits'], queryFn: () => apiClient.get('/credits') });

export const useCreateCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<Credit>) => apiClient.post('/credits', body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['credits'] }),
  });
};

export const useUpdateCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: Partial<Credit> & { id: string }) =>
      apiClient.put(`/credits/${id}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['credits'] }),
  });
};

export const useDeleteCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/credits/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['credits'] }),
  });
};

// ─── Deposits ─────────────────────────────────────────
export const useDeposits = () =>
  useQuery<Deposit[]>({ queryKey: ['deposits'], queryFn: () => apiClient.get('/deposits') });

// ─── Cards ────────────────────────────────────────────
export const useCards = () =>
  useQuery<Card[]>({ queryKey: ['cards'], queryFn: () => apiClient.get('/cards') });

// ─── Currencies ───────────────────────────────────────
export const useCurrencies = () =>
  useQuery<Currency[]>({ queryKey: ['currencies'], queryFn: () => apiClient.get('/currencies') });

// ─── BOKTs ────────────────────────────────────────────
export const useBokts = () =>
  useQuery<Bokt[]>({ queryKey: ['bokts'], queryFn: () => apiClient.get('/bokts') });

export const useBoktProducts = () =>
  useQuery<BoktProduct[]>({ queryKey: ['bokt_products'], queryFn: () => apiClient.get('/bokt_products') });

// ─── Institutions ─────────────────────────────────────
export const useInstitutions = () =>
  useQuery<Institution[]>({ queryKey: ['institutions'], queryFn: () => apiClient.get('/institutions') });

// ─── Blog Posts ───────────────────────────────────────
export const useBlogPosts = () =>
  useQuery<any[]>({ queryKey: ['blog_posts'], queryFn: () => apiClient.get('/blog_posts') });

// ─── Leads ────────────────────────────────────────────
export const useLeads = () =>
  useQuery<any[]>({ queryKey: ['leads'], queryFn: () => apiClient.get('/leads') });

// ─── Contacts ─────────────────────────────────────────
export const useContacts = () =>
  useQuery<any[]>({ queryKey: ['contacts'], queryFn: () => apiClient.get('/contacts') });
