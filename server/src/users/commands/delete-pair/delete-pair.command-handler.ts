import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePairCommand } from './delete-pair.command';
import { ShortUser } from 'users/users.interface';
import { NotFoundException } from '@nestjs/common';
import { UsersSelector } from 'users/users.selector';
import { NOT_FOUND_PAIR, NOT_FOUND_USER } from 'common/constants/error';

@CommandHandler(DeletePairCommand)
export class DeletePairCommandHandler
  implements ICommandHandler<DeletePairCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeletePairCommand): Promise<ShortUser[]> {
    const { user, userPairId } = command;

    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: { id: true } } },
      })
    ).pairs;

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException(NOT_FOUND_USER);
    }

    const deletedPair = pairs.find((pair) => pair.id === userPair.id);

    if (deletedPair) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { pairs: { disconnect: { id: deletedPair.id } } },
      });
    } else {
      throw new NotFoundException(NOT_FOUND_PAIR);
    }

    const updatedPairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      })
    ).pairs;

    return updatedPairs;
  }
}
