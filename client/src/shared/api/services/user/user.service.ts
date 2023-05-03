import { instance } from '@shared/api';
import type {
  PicturesVariants,
  QuerySorts,
  User,
  UserUnrequired,
} from '@shared/api/interfaces';

export const userService = {
  async getSortedUser(sorts: QuerySorts) {
    return instance.post<User>('users/sorted', sorts);
  },

  async getUser(id: string) {
    return instance.get<User>(`users/${id}`);
  },

  async updateUser(id: string, data: UserUnrequired) {
    return instance.put<User>(`users/${id}`, data);
  },

  async deleteUser(id: string) {
    return instance.delete<User>(`users/${id}`);
  },

  async createPair(forUserId: string, userId: string) {
    return instance.post<User>('users/pairs', { forUserId, userId });
  },

  async deletePair(forUserId: string, userId: string) {
    return instance.put<User>('users/pairs', { forUserId, userId });
  },

  async savePicture(picture: Blob, userId: string, setting: PicturesVariants) {
    return instance.post<User>(
      'users/picture',
      { picture, userId, setting },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },

  async deletePicture(
    pictureName: string,
    userId: string,
    setting: PicturesVariants
  ) {
    return instance.put<User>('users/picture', {
      pictureName,
      userId,
      setting,
    });
  },
};
