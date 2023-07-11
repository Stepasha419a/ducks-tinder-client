import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptPairCommand } from './accept-pair.command';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { ChatsService } from 'chats/chats.service';
import { ShortUserWithoutDistance } from 'users/users.interface';
import { NOT_FOUND_PAIR, NOT_FOUND_USER } from 'common/constants/error';

@CommandHandler(AcceptPairCommand)
export class AcceptPairCommandHandler
  implements ICommandHandler<AcceptPairCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsService: ChatsService,
  ) {}

  async execute(command: AcceptPairCommand): Promise<ShortUserWithoutDistance> {
    const { user, userPairId } = command;

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException(NOT_FOUND_USER);
    }

    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: { id: true } } },
      })
    ).pairs;

    const acceptedPair = pairs.find((pair) => pair.id === userPair.id);

    if (acceptedPair) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { pairs: { disconnect: { id: acceptedPair.id } } },
      });
    } else {
      throw new NotFoundException(NOT_FOUND_PAIR);
    }

    await this.chatsService.create([user.id, userPairId]);

    return this.prismaService.user.findUnique({
      where: { id: acceptedPair.id },
      select: UsersSelector.selectShortUser(),
    });
  }
}
