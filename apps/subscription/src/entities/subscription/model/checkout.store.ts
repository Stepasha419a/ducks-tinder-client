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
