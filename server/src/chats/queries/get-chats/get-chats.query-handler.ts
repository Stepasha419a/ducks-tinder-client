import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { GetChatsQuery } from './get-chats.query';
import { ShortChat } from 'chats/chats.interface';
import { UsersSelector } from 'users/users.selector';
import { ChatsSelector } from 'chats/chats.selector';

@QueryHandler(GetChatsQuery)
export class GetChatsQueryHandler implements IQueryHandler<GetChatsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetChatsQuery): Promise<ShortChat[]> {
    const { user } = query;

    return this.prismaService.chat.findMany({
      where: { users: { some: { id: user.id } } },
      select: {
        id: true,
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: ChatsSelector.selectMessage(),
        },
        users: {
          where: { id: { not: user.id } },
          select: UsersSelector.selectShortUser(),
        },
        blocked: true,
        blockedById: true,
      },
    });
  }
}
