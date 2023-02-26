import { AxiosResponse } from "axios";
import { IChat } from "../../models/IChat";
import { instance } from "../api";

export const chatApi = {
    getChats(id: string): Promise<AxiosResponse<IChat[]>> {
        return instance.get(`chat/${id}`)
            .then(res => res)
    },
    getChat(id: string): Promise<AxiosResponse<IChat>> {
        return instance.get(`chat/one/${id}`)
            .then(res => res)
    },
    createChat(ids: string[]): Promise<AxiosResponse<string[]>> {
        return instance.post(`chat/`, ids)
            .then(res => res)
    }
}