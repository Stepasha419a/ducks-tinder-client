import { create } from 'zustand';
import type { User } from '@ducks-tinder-client/common';
import { devtools } from 'zustand/middleware';

export interface UserState {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    currentUser: null,
    setCurrentUser: (value) => set(() => ({ currentUser: value })),
  }))
);
