import { instance } from '@shared/api';
import type {
  User,
  ShortUser,
  ShortUserWithoutDistance,
} from '@shared/api/interfaces';
import type { PartialUser } from './user-service.interface';

export const userService = {
  async getSortedUser() {
    return instance.get<ShortUser>('user/sorted');
  },

  async updateUser(data: PartialUser) {
    return instance.patch<User>('user', data);
  },

  async updateUserPlace(latitude: number, longitude: number) {
    return instance.patch<User>('user/place', { latitude, longitude });
  },

  async savePicture(picture: Blob) {
    return instance.post<User>(
      'user/picture',
      { picture },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  async deletePicture(id: string) {
    return instance.put<User>(`user/picture/${id}`);
  },

  async mixPictures(pictureOrders: number[]) {
    return instance.put<User>('user/picture/mix', {
      pictureOrders,
    });
  },

  async getPairs() {
    return instance.get<ShortUser[]>('user/pairs');
  },

  async acceptPair(pairId: string) {
    return instance.post<ShortUserWithoutDistance>(`user/pairs/${pairId}`);
  },

  async deletePair(pairId: string) {
    return instance.put<ShortUserWithoutDistance>(`user/pairs/${pairId}`);
  },

  async likeUser(userId: string) {
    return instance.post<undefined>(`user/like/${userId}`);
  },

  async dislikeUser(userId: string) {
    return instance.post<undefined>(`user/dislike/${userId}`);
  },

  async returnUser() {
    return instance.put<ShortUser>('user/return');
  },
};
