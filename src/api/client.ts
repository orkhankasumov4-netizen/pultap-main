const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pultap.duckdns.org/api/v1';

// Backend returns data directly (arrays/objects), not wrapped in { data: [] }
async function handleResponse(res: Response) {
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `API Error ${res.status}`);
  }
  return res.json();
}

export const apiClient = {
  get: (endpoint: string) =>
    fetch(`${API_BASE_URL}${endpoint}`).then(handleResponse),

  post: (endpoint: string, body: any) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (endpoint: string, body: any) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (endpoint: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) throw new Error(`API Error ${res.status}`);
    }),
};
