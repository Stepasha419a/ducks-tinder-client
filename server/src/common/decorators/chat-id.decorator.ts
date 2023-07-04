import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ChatId = createParamDecorator(
  (data: unknown, context: ExecutionContext): string | undefined => {
    const client = context.switchToWs().getClient();
    return client?.handshake?.query?.chatId;
  },
);
