import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateChatMemberQuery } from './validate-chat-member.query';

@QueryHandler(ValidateChatMemberQuery)
export class ValidateChatMemberQueryHandler
  implements IQueryHandler<ValidateChatMemberQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: ValidateChatMemberQuery): Promise<void> {
    const { user, dto } = query;

    const chat = await this.prismaService.chat.findFirst({
      where: { id: dto.chatId, users: { some: { id: user.id } } },
      select: {
        id: true,
      },
    });
    if (!chat) {
      throw new NotFoundException();
    }
  }
}
