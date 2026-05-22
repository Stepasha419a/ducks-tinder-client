import type { User } from '@ducks-tinder-client/common';
import { COMMON_LIB_SETTINGS, userStub } from '@ducks-tinder-client/common';
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

export function saveTestUser(user: User) {
  localStorage.setItem('testUser', JSON.stringify(user));
}

export function deleteTestUser() {
  localStorage.removeItem('testUser');
}

export function getTestUser(): User | null {
  const savedUser = localStorage.getItem('testUser');
  if (!savedUser) {
    return null;
  }
  const parsed: unknown = JSON.parse(savedUser);
  if (!validateSavedTestUser(parsed)) {
    localStorage.removeItem('testUser');
    return null;
  }

  return parsed;
}

function validateSavedTestUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  for (const key in userStub) {
    if (!(key in value)) {
      return false;
    }
  }

  return Object.keys(userStub).length === Object.keys(value).length;
}
