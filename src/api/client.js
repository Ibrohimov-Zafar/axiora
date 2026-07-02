const TOKEN_KEY = 'axiora_token';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, options = {}) {
  const { auth = false, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (res.status === 401 && auth) {
    clearToken();
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
  }

  const contentType = res.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    const error = new Error(data?.error || `HTTP ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

/** @param {unknown} err */
export function getApiErrorMessage(err, fallback = 'Xatolik yuz berdi') {
  if (err && typeof err === 'object' && 'data' in err) {
    const payload = /** @type {{ error?: string } | null | undefined } */ (
      /** @type {{ data?: unknown }} */ (err).data
    );
    if (payload?.error) return payload.error;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export const api = {
  login: (username, password) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  me: () => apiFetch('/auth/me', { auth: true }),

  submitContact: (body) =>
    apiFetch('/contact', { method: 'POST', body: JSON.stringify(body) }),

  getMessages: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/messages${qs ? `?${qs}` : ''}`, { auth: true });
  },

  markMessageRead: (id) =>
    apiFetch(`/messages/${id}/read`, { method: 'PATCH', auth: true }),

  deleteMessage: (id) =>
    apiFetch(`/messages/${id}`, { method: 'DELETE', auth: true }),

  getProjects: () => apiFetch('/projects', { auth: true }),

  createProject: (body) =>
    apiFetch('/projects', { method: 'POST', body: JSON.stringify(body), auth: true }),

  updateProject: (id, body) =>
    apiFetch(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(body), auth: true }),

  deleteProject: (id) =>
    apiFetch(`/projects/${id}`, { method: 'DELETE', auth: true }),

  getTeam: () => apiFetch('/team', { auth: true }),

  getTeamPublic: () => apiFetch('/team'),

  createTeamMember: (body) =>
    apiFetch('/team', { method: 'POST', body: JSON.stringify(body), auth: true }),

  updateTeamMember: (id, body) =>
    apiFetch(`/team/${id}`, { method: 'PATCH', body: JSON.stringify(body), auth: true }),

  deleteTeamMember: (id) =>
    apiFetch(`/team/${id}`, { method: 'DELETE', auth: true }),

  getShorts: () => apiFetch('/shorts'),

  getShortsAdmin: () => apiFetch('/shorts', { auth: true }),

  createShort: (body) =>
    apiFetch('/shorts', { method: 'POST', body: JSON.stringify(body), auth: true }),

  updateShort: (id, body) =>
    apiFetch(`/shorts/${id}`, { method: 'PATCH', body: JSON.stringify(body), auth: true }),

  deleteShort: (id) =>
    apiFetch(`/shorts/${id}`, { method: 'DELETE', auth: true }),

  getPartners: () => apiFetch('/partners'),

  getPartnersAdmin: () => apiFetch('/partners', { auth: true }),

  createPartner: (body) =>
    apiFetch('/partners', { method: 'POST', body: JSON.stringify(body), auth: true }),

  updatePartner: (id, body) =>
    apiFetch(`/partners/${id}`, { method: 'PATCH', body: JSON.stringify(body), auth: true }),

  deletePartner: (id) =>
    apiFetch(`/partners/${id}`, { method: 'DELETE', auth: true }),

  recordVisit: (body) =>
    apiFetch('/visits', { method: 'POST', body: JSON.stringify(body) }),

  getVisits: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/visits${qs ? `?${qs}` : ''}`, { auth: true });
  },

  clearVisits: () => apiFetch('/visits', { method: 'DELETE', auth: true }),

  getOverviewStats: () => apiFetch('/stats/overview', { auth: true }),
};
