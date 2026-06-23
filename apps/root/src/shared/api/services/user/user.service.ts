import type { ShortUser, User } from '@shared/api';

import { userMockService } from './user.mock-service';
import type {
  PairFilterParams,
  PairsInfo,
  UserService,
} from './user-service.interface';
import {
  getMockableService,
  getOptionalAbortControllerConfig,
  instance,
} from '@ducks-tinder-client/common';

export const createUserService = (): UserService =>
  getMockableService(
    {
      async getMatchUsers(take: number, skipUserIds?: string[]) {
        const config = getOptionalAbortControllerConfig('user/match', true);

        return instance.get<ShortUser[]>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/match`,
          {
            params: {
              take,
              skipUserIds,
            },
            ...config,
          }
        );
      },

      async updateUser(data: Partial<User>) {
        return instance.patch<User>(
          `${window._env_.VAR_USER_SERVICE_URL}/user`,
          data
        );
      },

      async updateUserPlace(latitude: number, longitude: number) {
        return instance.patch<User>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/place`,
          {
            latitude,
            longitude,
          }
        );
      },

      async savePicture(picture: Blob) {
        return instance.post<User>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/picture`,
          { picture },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      },

      async deletePicture(id: string) {
        return instance.put<User>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/picture/${id}`
        );
      },

      async mixPictures(pictureOrders: number[]) {
        return instance.put<User>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/picture/mix`,
          {
            pictureOrders,
          }
        );
      },

      async getPairs(params: PairFilterParams, abortPrevious?: boolean) {
        const config = getOptionalAbortControllerConfig(
          'user/pairs',
          abortPrevious
        );

        const res = await instance.get<ShortUser[]>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/pairs`,
          { params, ...config }
        );

        return res;
      },

      async getPairsInfo() {
        return instance.get<PairsInfo>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/pairs/info`
        );
      },

      async acceptPair(pairId: string) {
        return instance.post<ShortUser>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/pairs/${pairId}`
        );
      },

      async deletePair(pairId: string) {
        return instance.put<ShortUser>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/pairs/${pairId}`
        );
      },

      async likeUser(userId: string) {
        return instance.post<ShortUser>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/like/${userId}`
        );
      },

      async dislikeUser(userId: string) {
        return instance.post<ShortUser>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/dislike/${userId}`
        );
      },

      async returnUser() {
        return instance.put<ShortUser>(
          `${window._env_.VAR_USER_SERVICE_URL}/user/return`
        );
      },
    },
    userMockService
  );
