import { useState, useEffect } from 'react';

const STORAGE_KEY = 'fundot-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark') return true;
  if (stored === 'light') return false;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
};

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
