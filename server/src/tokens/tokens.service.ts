import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from 'auth/dto';
import { GenerateTokensCommand, RemoveTokenCommand } from './commands';

@Injectable()
export class TokensService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  public async generateTokens(payload: UserTokenDto) {
    return this.commandBus.execute(new GenerateTokensCommand(payload));
  }

  public async removeToken(refreshToken: string) {
    return this.commandBus.execute(new RemoveTokenCommand(refreshToken));
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
}
