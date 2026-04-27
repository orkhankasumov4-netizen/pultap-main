import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type { Bank, Credit, Deposit, Card, Currency, Bokt, BoktProduct, Institution, Lead, Contact } from '@/data/finance';

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
  useQuery<Record<string, unknown>[]>({ queryKey: ['blog_posts'], queryFn: () => apiClient.get('/blog_posts') });

// ─── Leads ────────────────────────────────────────────
// API returns: { success: true, data: Lead[] }
export const useLeads = () =>
  useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      const res = await apiClient.get('/leads');
      // Handle both wrapped { success, data } and direct array
      return Array.isArray(res) ? res : (res?.data ?? []);
    },
  });

export const useUpdateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: Partial<Lead> & { id: string }) =>
      apiClient.put(`/leads/${id}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};

// ─── Contacts ─────────────────────────────────────────
// API returns: { success: true, data: Contact[] }
export const useContacts = () =>
  useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await apiClient.get('/contacts');
      return Array.isArray(res) ? res : (res?.data ?? []);
    },
  });
