import type { AxiosResponse } from 'axios';
import { instance } from '../../shared/api';
import type { Chat } from '../../shared/api/interfaces';

export const chatApi = {
  async getChats(id: string): Promise<AxiosResponse<Chat[]>> {
    return instance.get(`chat/${id}`);
  },
  async getChat(id: string): Promise<AxiosResponse<Chat>> {
    return instance.get(`chat/one/${id}`);
  },
  async createChat(ids: string[]): Promise<AxiosResponse<string[]>> {
    return instance.post('chat/', ids);
  },
};
