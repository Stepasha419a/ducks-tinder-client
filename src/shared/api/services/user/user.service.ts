import { instance } from '@shared/api';
import type {
  User,
  ShortUser,
  ShortUserWithoutDistance,
} from '@shared/api/interfaces';
import type { PartialUser } from './user-service.interface';

export const userService = {
  async getSortedUser() {
    return instance.get<ShortUser>('users/sorted');
  },

  async updateUser(data: PartialUser) {
    return instance.patch<User>('users', data);
  },

  async updateUserPlace(latitude: number, longitude: number) {
    return instance.patch<User>('users/place', { latitude, longitude });
  },

  async savePicture(picture: Blob) {
    return instance.post<User>(
      'users/picture',
      { picture },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  async deletePicture(id: string) {
    return instance.put<User>(`users/picture/${id}`);
  },

  async mixPictures(pictureOrders: number[]) {
    return instance.put<User>('users/picture/mix', {
      pictureOrders,
    });
  },

  async getPairs() {
    return instance.get<ShortUser[]>('users/pairs');
  },

  async acceptPair(pairId: string) {
    return instance.post<ShortUserWithoutDistance>(`users/pairs/${pairId}`);
  },

  async deletePair(pairId: string) {
    return instance.put<ShortUserWithoutDistance>(`users/pairs/${pairId}`);
  },

  async likeUser(userId: string) {
    return instance.post<undefined>(`users/like/${userId}`);
  },

  async dislikeUser(userId: string) {
    return instance.post<undefined>(`users/dislike/${userId}`);
  },

  async returnUser() {
    return instance.put<ShortUser>('users/return');
  },
};
