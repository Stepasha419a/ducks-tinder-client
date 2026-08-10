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

