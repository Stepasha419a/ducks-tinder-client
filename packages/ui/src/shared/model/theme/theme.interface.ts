export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
