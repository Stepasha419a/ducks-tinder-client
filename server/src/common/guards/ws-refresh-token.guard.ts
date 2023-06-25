import { WsException } from '@nestjs/websockets';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { REFRESH_TOKEN_REGEX } from 'common/constants';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class WsRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const refreshToken = this.getRefreshTokenFromWs(client);

    const userData = await this.tokensService.validateRefreshToken(
      refreshToken,
    );
    if (!userData) {
      throw new WsException('Unauthorized');
    }

    const user = await this.usersService.getUser(userData.id);

    client.request.user = user;
    return true;
  }

  private getRefreshTokenFromWs(client) {
    if (client?.handshake?.headers?.cookie) {
      // to get token from string 'refreshToken=...; accessToken=...'
      return client?.handshake?.headers?.cookie.match(REFRESH_TOKEN_REGEX)?.[1];
    } else {
      throw new WsException('Unauthorized');
    }
  }
}
