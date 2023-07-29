import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DislikeUserCommand } from './dislike-user.command';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CAN_NOT_DISLIKE_YOURSELF,
  USER_ALREADY_CHECKED,
} from 'common/constants/error';

@CommandHandler(DislikeUserCommand)
export class DislikeUserCommandHandler
  implements ICommandHandler<DislikeUserCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DislikeUserCommand): Promise<void> {
    const { user, userPairId } = command;

    if (user.id === userPairId) {
      throw new BadRequestException(CAN_NOT_DISLIKE_YOURSELF);
    }

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException();
    }

    const checkedUsers = await this.prismaService.checkedUsers.findMany({
      where: { OR: [{ checkedId: user.id }, { checkedId: userPairId }] },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = checkedUsers.map((user) => user.checked.id);
    const wasCheckedIds = checkedUsers.map((user) => user.wasChecked.id);
    if (
      [...checkedIds, ...wasCheckedIds].find((userId) => userId === userPairId)
    ) {
      throw new BadRequestException(USER_ALREADY_CHECKED);
    }

    await this.prismaService.checkedUsers.create({
      data: { wasCheckedId: user.id, checkedId: userPairId },
    });
  }
}
