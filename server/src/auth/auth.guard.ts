import { TokensService } from '../tokens/tokens.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { accessToken } = req.cookies;

    const userData = this.tokensService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getOne(userData.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;

    return true;
  }
}
