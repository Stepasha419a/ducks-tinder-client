import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMessagesQuery } from './get-messages.query';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsSelector } from 'chats/chats.selector';
import { GetMessagesQueryReturn } from 'chats/chats.interface';
import { ChatsMapper } from 'chats/chats.mapper';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetMessagesQuery)
export class GetMessagesQueryHandler
  implements IQueryHandler<GetMessagesQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetMessagesQuery): Promise<GetMessagesQueryReturn> {
    const { user, dto } = query;

    const chat = await this.prismaService.chat.findFirst({
      where: { id: dto.chatId, users: { some: { id: user.id } } },
      select: { id: true },
    });
    if (!chat) {
      throw new NotFoundException();
    }

    const allMessagesCount = await this.prismaService.message.count({
      where: { chatId: chat.id },
    });

    if (dto.haveCount > allMessagesCount) {
      throw new NotFoundException();
    }

    // to take from db
    let takeMessages = 20;

    // to skip, f.e. all = 101, have = 24 => skip = 57
    let skipMessages = allMessagesCount - dto.haveCount - 20;

    // if skip < 0 f.e. all = 101, have = 100 => skip = -19
    if (skipMessages < 0) {
      // take = 20 - 19 = 1
      takeMessages = 20 + skipMessages;
      skipMessages = 0;
    }

    // return the most young messages, skipping
    // already available and taking most available until 20
    const messages = await this.prismaService.message.findMany({
      where: {
        chatId: chat.id,
      },
      select: ChatsSelector.selectMessage(),
      orderBy: { createdAt: 'asc' },
      skip: skipMessages,
      take: takeMessages,
    });

    return ChatsMapper.mapChatMessages(chat, messages);
  }
}
