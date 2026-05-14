export interface AppContextValue {
  userId: string | null;
  setUserId: (id: string | null) => void;
}
