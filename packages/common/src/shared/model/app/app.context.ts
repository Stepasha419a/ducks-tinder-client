import { createContext, useContext } from 'react';

import type { AppContextValue } from './app.interface';

export const AppContext = createContext<AppContextValue>({
  userId: null,
  setUserId: () => {},
});

export const useAppContext = () => useContext(AppContext);
