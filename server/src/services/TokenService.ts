import jwt from "jsonwebtoken";
import { UserDtoInterface } from "../dtos/userDto";
import tokenModule from "../models/token-module";

class TokenService {
    generateTokens(payload: UserDtoInterface) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '24h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModule.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModule.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = tokenModule.deleteOne({refreshToken})
        return tokenData
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
            return userData
        } catch (error) {
            return null
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
            return userData
        } catch (error) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = tokenModule.findOne({refreshToken})
        //console.log(`findToken tokenData: ${tokenData}`)
        return tokenData
    }
}

export default new TokenService()