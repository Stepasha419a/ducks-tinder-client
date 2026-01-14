import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ThemeContextValue } from '@shared/model';
import { Theme, ThemeContext } from '@shared/model';

import { applyTheme, isValidTheme } from './ThemeProvider.utils';

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    let savedTheme = localStorage.getItem('theme') as Theme;
    if (!isValidTheme(savedTheme)) {
      savedTheme = Theme.Light;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const handleSetTheme = useCallback((value: Theme) => {
    setTheme(value);
    applyTheme(value);
  }, []);

  const themeValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: handleSetTheme,
    }),
    [handleSetTheme, theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};
