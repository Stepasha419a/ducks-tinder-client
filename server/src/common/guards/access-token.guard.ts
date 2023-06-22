import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';
import { IS_PUBLIC_KEY } from 'common/constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
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

    const req = context.switchToHttp().getRequest();
    let client;

    let accessToken;
    const cookies = req.cookies;
    if (cookies?.accessToken) {
      accessToken = req.cookies.accessToken;
    } else {
      client = context.switchToWs().getClient();
      accessToken = this.getAccessTokenFromWs(client);
    }

    const userData = await this.tokensService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(userData.id);

    if (cookies?.accessToken) {
      req.user = user;
    } else if (client) {
      client.request.user = user;
    }

    return true;
  }

  private getAccessTokenFromWs(client) {
    if (client?.handshake?.headers?.cookie) {
      // to get token from string 'refreshToken=...; accessToken=...'
      const mappedTokens = client.handshake.headers.cookie
        .split(' ')
        .map((string) => string.split('='));
      const index = mappedTokens.findIndex((pair) => pair[0] === 'accessToken');
      return mappedTokens[index][1];
    } else {
      throw new UnauthorizedException();
    }
  }
}
