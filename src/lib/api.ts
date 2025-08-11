export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

function getToken(provided?: string): string | undefined {
  if (provided) return provided;
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem('token');
    if (t) return t;
  }
  return undefined;
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    if (typeof window === 'undefined') return null;
    const rt = localStorage.getItem('refreshToken');
    if (!rt) return null;
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: rt }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.token) {
      localStorage.setItem('token', data.token);
      return data.token as string;
    }
    return null;
  } catch {
    return null;
  }
}

async function doRequest<T>(path: string, init: RequestInit & { retry?: boolean } = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init);
  if (res.status === 401 && init.retry !== true) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      const headers = new Headers(init.headers as HeadersInit | undefined);
      headers.set('Authorization', `Bearer ${newToken}`);
      return doRequest<T>(path, { ...init, headers, retry: true });
    }
  }
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const t = getToken(token);
  return doRequest<T>(path, { headers: t ? { Authorization: `Bearer ${t}` } : undefined, cache: 'no-store' });
}

export async function apiPost<T>(path: string, body: any, token?: string): Promise<T> {
  const t = getToken(token);
  const headers: any = { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) };
  return doRequest<T>(path, { method: 'POST', headers, body: JSON.stringify(body) });
}

export async function apiDelete<T>(path: string, token?: string): Promise<T> {
  const t = getToken(token);
  const headers: any = t ? { Authorization: `Bearer ${t}` } : undefined;
  return doRequest<T>(path, { method: 'DELETE', headers });
}

export async function apiPatch<T>(path: string, body: any, token?: string): Promise<T> {
  const t = getToken(token);
  const headers: any = { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) };
  return doRequest<T>(path, { method: 'PATCH', headers, body: JSON.stringify(body) });
}

