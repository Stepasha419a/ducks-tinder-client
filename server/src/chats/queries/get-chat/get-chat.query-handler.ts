import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChatQuery } from './get-chat.query';
import { FullChat } from 'chats/chats.interfaces';
import { UsersSelector } from 'users/users.selector';
import { ChatsSelector } from 'chats/chats.selector';

@QueryHandler(GetChatQuery)
export class GetChatQueryHandler implements IQueryHandler<GetChatQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetChatQuery): Promise<FullChat> {
    const { user, id } = query;

    const candidate = await this.prismaService.chat.findFirst({
      where: { id, users: { some: { id: user.id } } },
      select: { id: true },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    const messagesCount = await this.prismaService.message.count({
      where: { chatId: id },
    });

    const skipCount = messagesCount > 20 ? messagesCount - 20 : 0;

    const chat = await this.prismaService.chat.findUnique({
      where: { id },
      select: {
        id: true,
        messages: {
          skip: skipCount,
          take: 20,
          orderBy: { createdAt: 'asc' },
          select: ChatsSelector.selectMessage(),
        },
        users: {
          where: { id: { not: user.id } },
          select: UsersSelector.selectShortUser(),
        },
      },
    });

    return { ...chat, messagesCount };
  }
}
