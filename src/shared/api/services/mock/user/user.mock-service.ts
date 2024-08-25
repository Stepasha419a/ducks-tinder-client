/* eslint-disable @typescript-eslint/no-unused-vars */

import type { User } from '@shared/api';
import type { UserService, PairFilterParams } from '@shared/api';
import { chatStub } from '@shared/api';
import { mockStorage, resolveAxiosResponse, saveTestUser } from '../mock';
import { matchingUserStubs, pairsInfoStub, shortUserStub } from './user.stub';

export const userMockService: UserService = {
  async getMe() {
    return resolveAxiosResponse(mockStorage.currentUser);
  },

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
    mockStorage.currentUser = { ...mockStorage.currentUser, ...data };
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse(mockStorage.currentUser);
  },

  async updateUserPlace(latitude: number, longitude: number) {
    mockStorage.currentUser = {
      ...mockStorage.currentUser,
      place: {
        address: 'place-address',
        latitude,
        longitude,
        name: 'place-name',
      },
    };
    saveTestUser(mockStorage.currentUser);

    return resolveAxiosResponse(mockStorage.currentUser);
  },

  async savePicture(picture: Blob) {
    return resolveAxiosResponse(mockStorage.currentUser);
  },

  async deletePicture(id: string) {
    return resolveAxiosResponse(mockStorage.currentUser);
  },

  async mixPictures(pictureOrders: number[]) {
    return resolveAxiosResponse(mockStorage.currentUser);
  },

  async getPairs(params: PairFilterParams) {
    return resolveAxiosResponse(matchingUserStubs);
  },

  async getPairsInfo() {
    return resolveAxiosResponse(pairsInfoStub);
  },

  async acceptPair(pairId: string) {
    mockStorage.chats.unshift({ ...chatStub, id: pairId });
    return resolveAxiosResponse({ ...shortUserStub, id: pairId });
  },

  async deletePair(pairId: string) {
    return resolveAxiosResponse({ ...shortUserStub, id: pairId });
  },

  async likeUser(userId: string) {
    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex + 1);
    return resolveAxiosResponse();
  },

  async dislikeUser(userId: string) {
    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex + 1);
    return resolveAxiosResponse();
  },

  async returnUser() {
    mockStorage.setCurrentMatchingIndex(mockStorage.currentMatchingIndex - 1);
    return resolveAxiosResponse(
      matchingUserStubs[mockStorage.currentMatchingIndex]
    );
  },
};
