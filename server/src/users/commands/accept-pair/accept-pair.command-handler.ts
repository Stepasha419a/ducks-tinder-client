import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptPairCommand } from './accept-pair.command';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { ChatsService } from 'chats/chats.service';
import { ShortUserWithoutDistance } from 'users/users.interface';
import { NOT_FOUND_PAIR } from 'common/constants/error';

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

    const userPair = await this.prismaService.user.findFirst({
      where: { id: userPairId, pairFor: { some: { id: user.id } } },
      select: { id: true },
    });
    if (!userPair) {
      throw new NotFoundException(NOT_FOUND_PAIR);
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { pairs: { disconnect: { id: userPair.id } } },
    });

    await this.chatsService.create([user.id, userPairId]);

    const acceptedPair = await this.prismaService.user.findUnique({
      where: { id: userPair.id },
      select: UsersSelector.selectShortUser(),
    });

    return { ...acceptedPair, place: { name: acceptedPair.place.name } };
  }
}
