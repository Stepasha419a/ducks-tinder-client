import type { AuthData } from './auth.interface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AuthState {
  authData: AuthData | null;
  isAuth: boolean | null;
  setIsAuth: (value: boolean) => void;
  setAuthData: (value: AuthData | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    isAuth: null,
    authData: null,
    setIsAuth: (value) => set(() => ({ isAuth: value })),
    setAuthData: (value) => set(() => ({ authData: value })),
  }))
);
