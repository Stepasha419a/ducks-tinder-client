/* eslint-disable @typescript-eslint/no-unused-vars */

import type { User } from '@/shared/api/interfaces';
import type {
  UserService,
  PairFilterParams,
} from '../../user/user-service.interface';
import { mockStorage, resolveAxiosResponse } from '../mock';
import { matchingUserStubs, pairsInfoStub } from './user.stub';
import { chatStub } from '../chat/chat.stub';

export const userMockService: UserService = {
  async getMatchUser() {
    return resolveAxiosResponse(
      matchingUserStubs[mockStorage.currentMatchingIndex]
    );
  },

  async updateUser(data: Partial<User>) {
    mockStorage.currentUser = { ...mockStorage.currentUser, ...data };
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
    return resolveAxiosResponse(pairId);
  },

  async deletePair(pairId: string) {
    return resolveAxiosResponse(pairId);
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
