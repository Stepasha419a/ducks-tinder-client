import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserType } from '@prisma/client';

interface UserOptions {
  isSocket?: boolean;
}

export const User = createParamDecorator(
  (options: UserOptions = null, ctx: ExecutionContext): UserType => {
    if (options?.isSocket) {
      const client = ctx.switchToWs().getClient();
      return client.request.user;
    }
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
