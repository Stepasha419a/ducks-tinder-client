import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ValidatedUserDto } from 'users/dto';

interface UserOptions {
  isSocket?: boolean;
}

export const User = createParamDecorator(
  (options: UserOptions = null, ctx: ExecutionContext): ValidatedUserDto => {
    if (options?.isSocket) {
      const client = ctx.switchToWs().getClient();
      return client.request.user;
    }
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
