import { TokensService } from '../tokens/tokens.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearer = request.headers.authorization.split(' ')[0];
      const token = request.headers.authorization.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.tokensService.validateAccessToken(token);

      if (!user) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
