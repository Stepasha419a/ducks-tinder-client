import { AxiosResponse } from 'axios';
import {
  PicturesVariants,
  QuerySorts,
  User,
  UserUnrequired,
} from '../../models/User/User';
import { instance } from '../api';

export type UserType = {
  _id?: string;

  name: string;
  description: string;
  picture: string;
};

export const usersAPI = {
  async getUsers(): Promise<AxiosResponse<User[]>> {
    return instance.get('users');
  },

  async getSortedUsers(sorts: QuerySorts): Promise<AxiosResponse<User[]>> {
    return instance.post(`users/sorted`, sorts);
  },

  async getCurrentUser(id: String): Promise<AxiosResponse<User>> {
    return instance.get(`users/${id}`);
  },

  async updateUser(
    id: string,
    data: UserUnrequired
  ): Promise<AxiosResponse<User>> {
    return instance.put(`users/${id}`, data);
  },

  async deleteUser(id: string): Promise<AxiosResponse<User>> {
    return instance.delete(`users/${id}`);
  },

  async createPair(
    forUserId: string,
    userId: string
  ): Promise<AxiosResponse<User>> {
    return instance.post(`users/pairs`, { forUserId, userId });
  },

  async deletePair(
    forUserId: string,
    userId: string
  ): Promise<AxiosResponse<User>> {
    return instance.put(`users/pairs`, { forUserId, userId });
  },

  async savePicture(
    picture: Blob,
    userId: string,
    setting: PicturesVariants
  ): Promise<AxiosResponse<User>> {
    return instance.post(
      `users/picture`,
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
  ): Promise<AxiosResponse<User>> {
    return instance.put(`users/picture`, { pictureName, userId, setting });
  },
};
