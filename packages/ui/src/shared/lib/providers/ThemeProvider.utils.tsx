import type { Theme } from '@shared/model';

export const applyTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const isValidTheme = (theme: string | null): theme is Theme => {
  switch (theme) {
    case 'light':
    case 'dark':
      return true;
    default:
      return false;
  }
};
