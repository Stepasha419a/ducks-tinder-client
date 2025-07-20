import type { ShortUser, User } from '@shared/api';
import { getOptionalAbortControllerConfig, instance } from '@shared/api';

import { getMockableService } from '../mock';
import { userMockService } from './user.mock-service';
import type {
  PairFilterParams,
  PairsInfo,
  UserService,
} from './user-service.interface';
import { COMMON_LIB_SETTINGS } from '@shared/lib';

export const createUserService = (): UserService =>
  getMockableService(
    {
      async getMe() {
        return instance.get<User>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/me`
        );
      },

      async getMatchUsers(take: number, skipUserIds?: string[]) {
        const config = getOptionalAbortControllerConfig('user/match', true);

        return instance.get<ShortUser[]>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/match`,
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
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user`,
          data
        );
      },

      async updateUserPlace(latitude: number, longitude: number) {
        return instance.patch<User>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/place`,
          {
            latitude,
            longitude,
          }
        );
      },

      async savePicture(picture: Blob) {
        return instance.post<User>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/picture`,
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
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/picture/${id}`
        );
      },

      async mixPictures(pictureOrders: number[]) {
        return instance.put<User>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/picture/mix`,
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
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/pairs`,
          { params, ...config }
        );

        return res;
      },

      async getPairsInfo() {
        return instance.get<PairsInfo>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/pairs/info`
        );
      },

      async acceptPair(pairId: string) {
        return instance.post<ShortUser>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/pairs/${pairId}`
        );
      },

      async deletePair(pairId: string) {
        return instance.put<ShortUser>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/pairs/${pairId}`
        );
      },

      async likeUser(userId: string) {
        return instance.post<ShortUser>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/like/${userId}`
        );
      },

      async dislikeUser(userId: string) {
        return instance.post<ShortUser>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/dislike/${userId}`
        );
      },

      async returnUser() {
        return instance.put<ShortUser>(
          `${COMMON_LIB_SETTINGS.USER_SERVICE_URL}/user/return`
        );
      },
    },
    userMockService
  );
