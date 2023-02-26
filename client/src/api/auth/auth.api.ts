import { AxiosResponse } from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import { instance } from "../api";

export type UserAuthParams = {
    email: string
    name?: string
    password: string
}

export const authAPI = {
    registration(email: string, name: string | undefined, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post('auth/registration', {email, name, password})
    },
    login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return instance.post('auth/login', {email, password})
    },
    logout(): Promise<void> {
        return instance.post('auth/logout')
    }
}