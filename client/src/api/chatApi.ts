import { AxiosResponse } from "axios";
import { IDialog } from "../models/IDialog";
import { instance } from "./api";

export const chatApi = {
    getDialogs(id: string): Promise<AxiosResponse<IDialog[]>> {
        return instance.get(`chat/${id}`)
            .then(res => res)
    }
}