import { User } from "../User/User"

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: User
}