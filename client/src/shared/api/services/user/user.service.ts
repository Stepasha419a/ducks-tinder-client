import { instance } from '@shared/api';
import type {
  User,
  PartialUser,
  ShortUser,
  Picture,
} from '@shared/api/interfaces';

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

  async deletePicture(order: number) {
    return instance.put<User>('users/picture', {
      order,
    });
  },

  async mixPictures(pictures: Picture[]) {
    return instance.put<User>('users/picture/mix', {
      pictures,
    });
  },

  async getPairs() {
    return instance.get<ShortUser[]>('users/pairs');
  },

  async acceptPair(pairId: string) {
    return instance.post<ShortUser[]>(`users/pairs/${pairId}`);
  },

  async deletePair(pairId: string) {
    return instance.put<ShortUser[]>(`users/pairs/${pairId}`);
  },

  async likeUser(userId: string) {
    return instance.post<undefined>(`users/like/${userId}`);
  },

  async dislikeUser(userId: string) {
    return instance.post<undefined>(`users/dislike/${userId}`);
  },

  async returnUser() {
    return instance.put<undefined>('users/return');
  },
};
