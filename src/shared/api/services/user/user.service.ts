import { instance } from '@shared/api';
import type { User, ShortUser } from '@shared/api/interfaces';
import type { PairsInfo, PartialUser } from './user-service.interface';

export const userService = {
  async getSortedUser() {
    return instance.get<ShortUser>(
      `${process.env.USER_SERVICE_URL!}/user/sorted`
    );
  },

  async updateUser(data: PartialUser) {
    return instance.patch<User>(`${process.env.USER_SERVICE_URL!}/user`, data);
  },

  async updateUserPlace(latitude: number, longitude: number) {
    return instance.patch<User>(`${process.env.USER_SERVICE_URL!}/user/place`, {
      latitude,
      longitude,
    });
  },

  async savePicture(picture: Blob) {
    return instance.post<User>(
      `${process.env.USER_SERVICE_URL!}/user/picture`,
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
      `${process.env.USER_SERVICE_URL!}/user/picture/${id}`
    );
  },

  async mixPictures(pictureOrders: number[]) {
    return instance.put<User>(
      `${process.env.USER_SERVICE_URL!}/user/picture/mix`,
      {
        pictureOrders,
      }
    );
  },

  async getPairs() {
    return instance.get<ShortUser[]>(
      `${process.env.USER_SERVICE_URL!}/user/pairs`
    );
  },

  async getPairsInfo() {
    return instance.get<PairsInfo>(
      `${process.env.USER_SERVICE_URL!}/user/pairs/info`
    );
  },

  async acceptPair(pairId: string) {
    return instance.post<string>(
      `${process.env.USER_SERVICE_URL!}/user/pairs/${pairId}`
    );
  },

  async deletePair(pairId: string) {
    return instance.put<string>(
      `${process.env.USER_SERVICE_URL!}/user/pairs/${pairId}`
    );
  },

  async likeUser(userId: string) {
    return instance.post<undefined>(
      `${process.env.USER_SERVICE_URL!}/user/like/${userId}`
    );
  },

  async dislikeUser(userId: string) {
    return instance.post<undefined>(
      `${process.env.USER_SERVICE_URL!}/user/dislike/${userId}`
    );
  },

  async returnUser() {
    return instance.put<ShortUser>(
      `${process.env.USER_SERVICE_URL!}/user/return`
    );
  },
};
