import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';
import { IS_PUBLIC_KEY } from 'common/constants';
import { WsException } from '@nestjs/websockets';
import { UNAUTHORIZED } from 'common/constants/error';

@Injectable()
export class WsAccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const client = context.switchToWs().getClient();
    const accessToken = client.handshake?.auth?.authorization;

    const userData = await this.tokensService.validateAccessToken(accessToken);
    if (!userData) {
      throw new WsException(UNAUTHORIZED);
    }

    const user = await this.usersService.getUser(userData.id);

    client.request.user = user;
    return true;
  }
}
