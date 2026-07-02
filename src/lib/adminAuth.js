import { api, setToken, clearToken } from '@/api/client';

const LEGACY_KEY = 'axiora_admin_auth';

export async function adminLogin(username, password) {
  const data = await api.login(username, password);
  setToken(data.token);
  localStorage.removeItem(LEGACY_KEY);
  return data;
}

export function adminLogout() {
  clearToken();
  localStorage.removeItem(LEGACY_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(localStorage.getItem('axiora_token'));
}

export async function verifyAdminSession() {
  if (!isAdminLoggedIn()) return false;
  try {
    await api.me();
    return true;
  } catch {
    adminLogout();
    return false;
  }
}
