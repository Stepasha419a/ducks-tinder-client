import { AxiosResponse } from "axios";
import { PicturesVariants, QuerySorts, User, UserUnrequired } from "../../models/User/User";
import { instance } from "../api";

export type UserType = {
    _id?: string

    name: string
    description: string
    picture: string
}

export const usersAPI = {
    getUsers(): Promise<AxiosResponse<User[]>> {
        return instance.get('users')
            .then(res => res)
    },
    getSortedUsers(sorts: QuerySorts): Promise<AxiosResponse<User[]>> {
        return instance.post(`users/sorted`, sorts)
            .then(res => res)
    },
    getCurrentUser(id: String): Promise<AxiosResponse<User>> {
        return instance.get(`users/${id}`)
            .then(res => res)
    },
    updateUser(id: string, data: UserUnrequired): Promise<AxiosResponse<User>> {
        return instance.put(`users/${id}`, data)
            .then(res => res)
    },
    deleteUser(id: string) {
        return instance.delete(`users/${id}`)
            .then(res => res)
    },
    createPair(forUserId: string, userId: string) {
        return instance.post(`users/pairs`, {forUserId, userId})
            .then(res => res)
    },
    deletePair(forUserId: string, userId: string) {
        return instance.put(`users/pairs`, {forUserId, userId})
            .then(res => res)
    },
    savePicture(picture: Blob, userId: string, setting: PicturesVariants): Promise<AxiosResponse<User>> {
        return instance.post(`users/picture`, {picture, userId, setting}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res)
    },
    deletePicture(pictureName: string, userId: string, setting: PicturesVariants): Promise<AxiosResponse<User>> {
        return instance.put(`users/picture`, {pictureName, userId, setting})
            .then(res => res)
    }
}