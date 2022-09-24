import jwt from "jsonwebtoken";
import { UserDtoInterface } from "../dtos/userDto";
import tokenModel from "../models/token-model";

class TokenService {
    generateTokens(payload: UserDtoInterface) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '7d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = tokenModel.deleteOne({refreshToken})
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
        const tokenData = tokenModel.findOne({refreshToken})
        //console.log(`findToken tokenData: ${tokenData}`)
        return tokenData
    }
}

export default new TokenService()