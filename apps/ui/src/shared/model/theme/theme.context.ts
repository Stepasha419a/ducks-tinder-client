import { createContext, useContext } from 'react';
import type { ThemeContextValue } from './theme.interface';
import { Theme } from './theme.interface';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.Light,
});

export const useThemeContext = () => useContext(ThemeContext);
