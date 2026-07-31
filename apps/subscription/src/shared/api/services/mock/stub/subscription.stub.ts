import { SubscriptionTier, type Subscription } from '@shared/api';
import { HOUR_IN_MS } from '@ducks-tinder-client/common';

export const subscriptionStub: Subscription = {
  userId: 'id',
  subscription: SubscriptionTier.Plus,
  login: 'login',
  superLikesCount: 1,
  searchBoostsCount: 1,
  searchBoostExpiresAt: null,
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + HOUR_IN_MS).toISOString(),
};
