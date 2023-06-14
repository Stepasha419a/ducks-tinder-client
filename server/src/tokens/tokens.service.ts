import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserTokenDto } from 'auth/dto';
import {
  GenerateTokensCommand,
  RemoveTokenCommand,
  ValidateAccessTokenCommand,
  ValidateRefreshTokenCommand,
} from './commands';

@Injectable()
export class TokensService {
  constructor(private readonly commandBus: CommandBus) {}

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
    return this.commandBus.execute(new ValidateAccessTokenCommand(token));
  }
}
