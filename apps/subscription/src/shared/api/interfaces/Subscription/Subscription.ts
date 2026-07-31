export enum SubscriptionTier {
  Plus = 'plus',
}

export interface Subscription {
  userId: string;
  subscription: string;
  login: string;
  superLikesCount: number;
  searchBoostsCount: number;
  searchBoostExpiresAt: string | null;
  expiresAt: string;
  createdAt: string;
}
