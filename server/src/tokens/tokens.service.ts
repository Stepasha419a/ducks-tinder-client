import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from 'auth/dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateTokens(payload: UserTokenDto) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    await this.saveRefreshToken(payload.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  public async removeToken(refreshToken: string) {
    const existingRefreshToken = await this.prismaService.token.findUnique({
      where: { refreshToken },
    });
    if (!existingRefreshToken) {
      throw new UnauthorizedException();
    }

    const tokenData = await this.prismaService.token.delete({
      where: { refreshToken },
    });
    return tokenData;
  }

  public async validateRefreshToken(token: string) {
    try {
      const existingRefreshToken = await this.prismaService.token.findUnique({
        where: { refreshToken: token },
      });
      if (!existingRefreshToken) {
        throw new UnauthorizedException();
      }

      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  public validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
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
}
