import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptPairCommand } from './accept-pair.command';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { ChatsService } from 'chats/chats.service';
import { ShortUser } from 'users/users.interface';

@CommandHandler(AcceptPairCommand)
export class AcceptPairCommandHandler
  implements ICommandHandler<AcceptPairCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsService: ChatsService,
  ) {}

  async execute(command: AcceptPairCommand): Promise<ShortUser[]> {
    const { user, userPairId } = command;

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException('Such user was not found');
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
      throw new NotFoundException('Pair with such an id was not found');
    }

    await this.chatsService.create([user.id, userPairId]);

    const updatedPairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      })
    ).pairs;

    return updatedPairs;
  }
}
