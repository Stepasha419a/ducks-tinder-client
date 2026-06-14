import type { User } from '../../interfaces';
import { matchingUserStubs, userStub } from './stub';

export const mockStorage = {
  currentUser: userStub,
  currentMatchingIndex: 0,
  setCurrentMatchingIndex(value: number) {
    if (value >= matchingUserStubs.length) {
      this.currentMatchingIndex = 0;
    } else if (value < 0) {
      this.currentMatchingIndex = matchingUserStubs.length - 1;
    } else {
      this.currentMatchingIndex = value;
    }

    return this.currentMatchingIndex;
  },
};

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
