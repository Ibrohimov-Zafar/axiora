const THEME_KEY = 'axiora_theme';
const MOBILE_QUERY = '(max-width: 768px)';

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}

export function getInitialDark() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light') return false;
  if (saved === 'dark') return true;
  return true;
}

export function applyThemeClass(dark) {
  document.documentElement.classList.toggle('dark', dark);
}

export function saveTheme(dark) {
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}
