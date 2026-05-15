const KEY = 'axiora_admin_auth';

export const adminLogin = (username, password) => {
  if (username === 'admin1' && password === 'admin123') {
    localStorage.setItem(KEY, '1');
    return true;
  }
  return false;
};

export const adminLogout = () => localStorage.removeItem(KEY);

export const isAdminLoggedIn = () => localStorage.getItem(KEY) === '1';
