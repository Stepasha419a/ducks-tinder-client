import type { Subscription } from '@shared/api/interfaces';
import type { AxiosResponse } from 'axios';

export interface CreateSubscription {
  subscription: string;
  login: string;
}

export interface SubscriptionService {
  getSubscription(): Promise<AxiosResponse<Subscription>>;
  createSubscription(
    data: CreateSubscription
  ): Promise<AxiosResponse<Subscription>>;
  cancelSubscription(): Promise<AxiosResponse<Subscription>>;
}
