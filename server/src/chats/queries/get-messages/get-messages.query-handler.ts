import { WsException } from '@nestjs/websockets';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMessagesQuery } from './get-messages.query';
import { Message } from 'chats/chats.interfaces';
import { PrismaService } from 'prisma/prisma.service';

@QueryHandler(GetMessagesQuery)
export class GetMessagesQueryHandler
  implements IQueryHandler<GetMessagesQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetMessagesQuery): Promise<Message[]> {
    const {
      user,
      dto: { chatId, haveCount },
    } = query;

    const candidate = await this.prismaService.chat.findFirst({
      where: { id: chatId, users: { some: { id: user.id } } },
      select: { id: true },
    });
    if (!candidate) {
      throw new WsException('Not found');
    }

    const allMessagesCount = await this.prismaService.message.count({
      where: { chatId },
    });

    if (haveCount > allMessagesCount) {
      throw new WsException('Not found');
    }

    // to take from db
    let takeMessages = 20;

    // to skip, f.e. all = 101, have = 24 => skip = 57
    let skipMessages = allMessagesCount - haveCount - 20;

    // if skip < 0 f.e. all = 101, have = 100 => skip = -19
    if (skipMessages < 0) {
      // take = 20 - 19 = 1
      takeMessages = 20 + skipMessages;
      skipMessages = 0;
    }

    // return the most young messages, skipping
    // already available and taking most available until 20
    return this.prismaService.message.findMany({
      where: {
        chatId,
      },
      select: { id: true, text: true, userId: true },
      orderBy: { createdAt: 'asc' },
      skip: skipMessages,
      take: takeMessages,
    });
  }
}
