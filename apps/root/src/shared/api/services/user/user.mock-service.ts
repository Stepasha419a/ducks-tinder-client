/* eslint-disable @typescript-eslint/no-unused-vars */

import { authMockStorage, saveTestUser } from '@ducks-tinder-client/auth';
import type { User } from '@ducks-tinder-client/common';
import {
  globalEventEmitter,
  resolveAxiosResponse,
} from '@ducks-tinder-client/common';
import type { PairFilterParams, UserService } from '@shared/api';
import {
  matchingUserStubs,
  mockStorage,
  pairsInfoStub,
  shortUserStub,
} from '@shared/api';

export const userMockService: UserService = {
  async getMatchUsers(take: number, skipUserIds: string[]) {
    return resolveAxiosResponse(
      matchingUserStubs
        .filter((user) => !skipUserIds.includes(user.id))
        .slice(
          mockStorage.currentMatchingIndex,
          mockStorage.currentMatchingIndex + take
        )
    );
  },

  async updateUser(data: Partial<User>) {
    authMockStorage.currentUser = { ...authMockStorage.currentUser, ...data };
    saveTestUser(authMockStorage.currentUser);

    return resolveAxiosResponse(authMockStorage.currentUser);
  },

  async updateUserPlace(latitude: number, longitude: number) {
    authMockStorage.currentUser = {
      ...authMockStorage.currentUser,
      place: {
        address: 'place-address',
        latitude,
        longitude,
        name: 'place-name',
      },
    };
    saveTestUser(authMockStorage.currentUser);

    return resolveAxiosResponse(authMockStorage.currentUser);
  },

  async savePicture(picture: Blob) {
    return resolveAxiosResponse(authMockStorage.currentUser);
  },

  async deletePicture(id: string) {
    return resolveAxiosResponse(authMockStorage.currentUser);
  },

  async mixPictures(pictureOrders: number[]) {
    return resolveAxiosResponse(authMockStorage.currentUser);
  },

  async getPairs(params: PairFilterParams) {
    return resolveAxiosResponse(matchingUserStubs);
  },

  async getPairsInfo() {
    return resolveAxiosResponse(pairsInfoStub);
  },

  async acceptPair(pairId: string) {
    globalEventEmitter.emit('accept-pair', { id: pairId });
    return resolveAxiosResponse({ ...shortUserStub, id: pairId });
  },

  async deletePair(pairId: string) {
    return resolveAxiosResponse({ ...shortUserStub, id: pairId });
  },

  async likeUser(userId: string) {
    const user = matchingUserStubs[mockStorage.currentMatchingIndex];

    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex + 1);
    return resolveAxiosResponse(user);
  },

  async dislikeUser(userId: string) {
    const user = matchingUserStubs[mockStorage.currentMatchingIndex];

    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex + 1);
    return resolveAxiosResponse(user);
  },

  async returnUser() {
    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex - 1);
    return resolveAxiosResponse(
      matchingUserStubs[mockStorage.currentMatchingIndex]
    );
  },
};
