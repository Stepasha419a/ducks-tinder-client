import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserPassDto } from 'src/users/users.interface';
import { Token, TokenDocument } from './tokens.model';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
        private jwtServise: JwtService
    ) {}

    public generateTokens(payload: IUserPassDto) {
        const accessToken = this.jwtServise.sign(payload, {expiresIn: '10d', secret: process.env.SECRET_KEY})
        const refreshToken = this.jwtServise.sign(payload, {expiresIn: '30d', secret: process.env.SECRET_KEY})
        return {
            accessToken,
            refreshToken
        }
    }

    public async saveToken(userId: string, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await this.tokenModel.create({user: userId, refreshToken})
        return token
    }

    public async removeToken(refreshToken: string) {
        const tokenData = this.tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    public validateRefreshToken(token: string) {
        try {
            const userData = this.jwtServise.verify(token, {secret: process.env.SECRET_KEY})
            return userData
        } catch (error) {
            return null
        }
    }

    public validateAccessToken(token: string) {
        try {
            const userData = this.jwtServise.verify(token, {secret: process.env.SECRET_KEY})
            return userData
        } catch (error) {
            return null
        }
    }

    public async findToken(refreshToken: string) {
        const tokenData = this.tokenModel.findOne({refreshToken})
        return tokenData
    }
}