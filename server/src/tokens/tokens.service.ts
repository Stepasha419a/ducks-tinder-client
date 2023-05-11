import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IUserPassDto } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public generateTokens(payload: IUserPassDto) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10d',
      secret: process.env.SECRET_KEY,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.SECRET_KEY,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.prismaService.token.findUnique({
      where: { id: userId },
    });
    if (tokenData) {
      return this.prismaService.token.update({
        where: { id: tokenData.id },
        data: { refreshToken },
      });
    }
    return this.prismaService.token.create({
      data: { id: userId, refreshToken },
    });
  }

  public async removeToken(refreshToken: string) {
    const tokenData = await this.prismaService.token.delete({
      where: { refreshToken },
    });
    return tokenData;
  }

  public validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  public validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  public async findToken(refreshToken: string) {
    const tokenData = this.prismaService.token.findUnique({
      where: { refreshToken },
    });
    return tokenData;
  }
}
