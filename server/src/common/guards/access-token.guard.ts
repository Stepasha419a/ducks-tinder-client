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
    const cookies = req.cookies;
    if (!cookies?.accessToken) {
      throw new UnauthorizedException();
    }

    const userData = await this.tokensService.validateAccessToken(
      cookies.accessToken,
    );
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(userData.id);

    req.user = user;

    return true;
  }
}
