import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ChatSocketQueryData } from 'chats/chats.interface';

export const ChatData = createParamDecorator(
  (
    data: unknown,
    context: ExecutionContext,
  ): ChatSocketQueryData | undefined => {
    const client = context.switchToWs().getClient();
    return {
      chatId: client?.handshake?.query?.chatId,
      userIds: client?.handshake?.query?.userIds?.split(' '),
    };
  },
);
