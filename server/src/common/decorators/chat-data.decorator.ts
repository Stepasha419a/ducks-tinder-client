import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ChatSocketQueryData } from 'chats/chats.interface';

export const ChatData = createParamDecorator(
  (
    data: unknown,
    context: ExecutionContext,
  ): ChatSocketQueryData | undefined => {
    const client = context.switchToWs().getClient();
    return {
      userIds: client?.handshake?.query?.userIds?.split(' '),
    };
  },
);
