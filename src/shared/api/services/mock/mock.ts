import type { AxiosResponse } from 'axios';
import { userStub } from './user/user.stub';

export async function resolveAxiosResponse<T>(
  data?: T
): Promise<AxiosResponse<T>> {
  return Promise.resolve({
    config: {},
    data: data as T,
    headers: {},
    status: 200,
    statusText: '',
  });
}

export function getMockableService<T>(service: T, mockService: T): T {
  return import.meta.env.VITE_MODE === 'test' ? mockService : service;
}

export const mockStorage = {
  currentUser: userStub,
};
