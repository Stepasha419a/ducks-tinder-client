import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from 'auth/dto';
import {
  GenerateTokensCommand,
  RemoveTokenCommand,
  ValidateRefreshTokenCommand,
} from './commands';

@Injectable()
export class TokensService {
  constructor(
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
    return this.commandBus.execute(new ValidateRefreshTokenCommand(token));
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
