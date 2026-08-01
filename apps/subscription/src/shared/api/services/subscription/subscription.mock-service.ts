import { resolveAxiosResponse } from '@ducks-tinder-client/common';
import type {
  SubscriptionService,
  CreateSubscription,
} from './subscription-service.interface';
import { mockStorage } from '../mock';

export const subscriptionMockService: SubscriptionService = {
  async getSubscription() {
    return resolveAxiosResponse(mockStorage.subscription);
  },
  async createSubscription(data: CreateSubscription) {
    mockStorage.subscription = { ...mockStorage.subscription, ...data };
    return resolveAxiosResponse(mockStorage.subscription);
  },
  async cancelSubscription() {
    mockStorage.subscription = {
      ...mockStorage.subscription,
      expiresAt: new Date().toISOString(),
    };
    return resolveAxiosResponse(mockStorage.subscription);
  },
};
