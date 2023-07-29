import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePairCommand } from './delete-pair.command';
import { ShortUserWithoutDistance } from 'users/users.interface';
import { NotFoundException } from '@nestjs/common';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(DeletePairCommand)
export class DeletePairCommandHandler
  implements ICommandHandler<DeletePairCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeletePairCommand): Promise<ShortUserWithoutDistance> {
    const { user, userPairId } = command;

    const userPair = await this.prismaService.user.findFirst({
      where: { id: userPairId, pairFor: { some: { id: user.id } } },
      select: { id: true },
    });
    if (!userPair) {
      throw new NotFoundException();
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { pairs: { disconnect: { id: userPair.id } } },
    });

    const deletedPair = await this.prismaService.user.findUnique({
      where: { id: userPair.id },
      select: UsersSelector.selectShortUser(),
    });

    return { ...deletedPair, place: { name: deletedPair.place.name } };
  }
}
