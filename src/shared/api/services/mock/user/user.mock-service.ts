/* eslint-disable @typescript-eslint/no-unused-vars */

import type { User } from '@/shared/api/interfaces';
import type {
  UserService,
  PairFilterParams,
} from '../../user/user-service.interface';
import { mockStorage, resolveAxiosResponse } from '../mock';
import { pairsInfoStub, shortUserStub, userStub } from './user.stub';

export const userMockService: UserService = {
  async getMatchUser() {
    return resolveAxiosResponse(shortUserStub);
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
    return resolveAxiosResponse([shortUserStub, shortUserStub, shortUserStub]);
  },

  async getPairsInfo() {
    return resolveAxiosResponse(pairsInfoStub);
  },

  async acceptPair(pairId: string) {
    return resolveAxiosResponse('id');
  },

  async deletePair(pairId: string) {
    return resolveAxiosResponse('id');
  },

  async likeUser(userId: string) {
    return resolveAxiosResponse();
  },

  async dislikeUser(userId: string) {
    return resolveAxiosResponse();
  },

  async returnUser() {
    return resolveAxiosResponse(shortUserStub);
  },
};
