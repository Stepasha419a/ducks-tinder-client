import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ThemeContextValue } from '@shared/model';
import { Theme, ThemeContext } from '@shared/model';

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (isValidTheme(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const themeValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

function isValidTheme(theme: string | null): theme is Theme {
  switch (theme) {
    case 'light':
    case 'dark':
      return true;
    default:
      return false;
  }
}
