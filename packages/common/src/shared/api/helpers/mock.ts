import { COMMON_LIB_SETTINGS } from '@shared/lib';
import type { AxiosError, AxiosResponse } from 'axios';

export async function resolveAxiosResponse<T>(
  data?: T
): Promise<AxiosResponse<T>> {
  return Promise.resolve({
    config: {},
    data: data as T,
    headers: {},
    status: 200,
    statusText: '',
  } as AxiosResponse<T>);
}

export async function rejectWithAxiosResponseError<T>(
  status: number,
  data?: T
): Promise<AxiosError<T>> {
  return Promise.reject({
    config: {},
    data: data as T,
    headers: {},
    status,
    statusText: '',
  });
}

export function getMockableService<T>(service: T, mockService: T): T {
  return COMMON_LIB_SETTINGS.WITH_MOCKS ? mockService : service;
}
