import { AxiosResponse } from 'axios';
import { Chat } from '../../models/Chat/Chat';
import { instance } from '../api';

export const chatApi = {
  async getChats(id: string): Promise<AxiosResponse<Chat[]>> {
    return instance.get(`chat/${id}`);
  },
  async getChat(id: string): Promise<AxiosResponse<Chat>> {
    return instance.get(`chat/one/${id}`);
  },
  async createChat(ids: string[]): Promise<AxiosResponse<string[]>> {
    return instance.post(`chat/`, ids);
  },
};
