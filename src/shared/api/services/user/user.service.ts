import type { User, ShortUser } from '@shared/api';
import { getOptionalAbortControllerConfig } from '@shared/api';
import { instance } from '@shared/api';
import { getMockableService } from '@shared/api';
import { userMockService } from '../mock';
import type { PairFilterParams, PairsInfo } from './user-service.interface';
import type { UserService } from './user-service.interface';

export const userService: UserService = getMockableService(
  {
    async getMe() {
      return instance.get<User>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/me`
      );
    },

    async getMatchUsers(take: number, skipUserIds?: string[]) {
      const config = getOptionalAbortControllerConfig('user/match', true);

      return instance.get<ShortUser[]>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/match`,
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
        `${import.meta.env.VITE_USER_SERVICE_URL}/user`,
        data
      );
    },

    async updateUserPlace(latitude: number, longitude: number) {
      return instance.patch<User>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/place`,
        {
          latitude,
          longitude,
        }
      );
    },

    async savePicture(picture: Blob) {
      return instance.post<User>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/picture`,
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
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/picture/${id}`
      );
    },

    async mixPictures(pictureOrders: number[]) {
      return instance.put<User>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/picture/mix`,
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
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/pairs`,
        { params, ...config }
      );

      return res;
    },

    async getPairsInfo() {
      return instance.get<PairsInfo>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/pairs/info`
      );
    },

    async acceptPair(pairId: string) {
      return instance.post<ShortUser>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/pairs/${pairId}`
      );
    },

    async deletePair(pairId: string) {
      return instance.put<ShortUser>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/pairs/${pairId}`
      );
    },

    async likeUser(userId: string) {
      return instance.post<ShortUser>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/like/${userId}`
      );
    },

    async dislikeUser(userId: string) {
      return instance.post<ShortUser>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/dislike/${userId}`
      );
    },

    async returnUser() {
      return instance.put<ShortUser>(
        `${import.meta.env.VITE_USER_SERVICE_URL}/user/return`
      );
    },
  },
  userMockService
);
