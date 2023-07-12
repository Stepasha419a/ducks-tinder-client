import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedUser } from 'users/users.interface';

interface UserOptions {
  isSocket?: boolean;
}

export const User = createParamDecorator(
  (options: UserOptions = null, ctx: ExecutionContext): AuthorizedUser => {
    if (options?.isSocket) {
      const client = ctx.switchToWs().getClient();
      return client.request.user;
    }
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
