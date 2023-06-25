import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';
import { ACCESS_TOKEN_REGEX, IS_PUBLIC_KEY } from 'common/constants';

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
    const accessToken = this.getAccessTokenFromWs(client);

    const userData = await this.tokensService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(userData.id);

    client.request.user = user;
    return true;
  }

  private getAccessTokenFromWs(client) {
    if (client?.handshake?.headers?.cookie) {
      // to get token from string 'refreshToken=...; accessToken=...'
      return client?.handshake?.headers?.cookie.match(ACCESS_TOKEN_REGEX)?.[1];
    } else {
      throw new UnauthorizedException();
    }
  }
}
