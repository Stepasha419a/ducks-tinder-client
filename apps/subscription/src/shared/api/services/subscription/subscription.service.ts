import type { Subscription } from '@shared/api/interfaces';
import { subscriptionMockService } from './subscription.mock-service';
import type {
  CreateSubscription,
  SubscriptionService,
} from './subscription-service.interface';
import { getMockableService, instance } from '@ducks-tinder-client/common';

export const createSubscriptionService = (): SubscriptionService => {
  return getMockableService(
    {
      async getSubscription() {
        return instance.get<Subscription>(
          `${window._env_.VAR_SUBSCRIPTION_SERVICE_URL}/subscription`
        );
      },
      async createSubscription(data: CreateSubscription) {
        return instance.post<Subscription>(
          `${window._env_.VAR_SUBSCRIPTION_SERVICE_URL}/subscription`,
          data
        );
      },
      async cancelSubscription() {
        return instance.put<Subscription>(
          `${window._env_.VAR_SUBSCRIPTION_SERVICE_URL}/subscription`
        );
      },
    },
    subscriptionMockService
  );
};

interface Instances {
  subscriptionService: SubscriptionService | null;
}

const instances: Instances = {
  subscriptionService: null,
};

const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService();
  }

  return instances[key] as T;
};

export const getSubscriptionService = () =>
  getOrCreateService('subscriptionService', createSubscriptionService);
