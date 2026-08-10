import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export enum CheckoutItemType {
  Plus = 'plus',
  Boosts = 'boosts',
  SuperLikes = 'superLikes',
}
