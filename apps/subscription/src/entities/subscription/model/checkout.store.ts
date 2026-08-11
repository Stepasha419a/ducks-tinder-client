import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export enum CheckoutItemType {
  Plus = 'plus',
  Boosts = 'boosts',
  SuperLikes = 'superLikes',
}

export interface CheckoutPlus {
  type: CheckoutItemType.Plus;
  months: number;
  price: number;
}

export interface CheckoutConsumable {
  type: CheckoutItemType.Boosts | CheckoutItemType.SuperLikes;
  count: number;
  price: number;
}

export type CheckoutItem = CheckoutPlus | CheckoutConsumable;

export interface CheckoutState {
  item: CheckoutItem | null;
  setItem: (value: CheckoutItem | null) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    (set) => ({
      item: null,
      setItem: (value) => set(() => ({ item: value })),
    }),
    { name: 'checkoutStore' }
  )
);
