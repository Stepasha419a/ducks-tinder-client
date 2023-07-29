import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { LikeUserCommand } from './like-user.command';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CAN_NOT_LIKE_YOURSELF,
  USER_ALREADY_CHECKED,
} from 'common/constants/error';

@CommandHandler(LikeUserCommand)
export class LikeUserCommandHandler
  implements ICommandHandler<LikeUserCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: LikeUserCommand): Promise<void> {
    const { user, userPairId } = command;

    if (user.id === userPairId) {
      throw new BadRequestException(CAN_NOT_LIKE_YOURSELF);
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

    const isSomeonePairForAnotherOne = [...checkedIds, ...wasCheckedIds].find(
      (userId) => userId == user.id || userId == userPairId,
    );

    if (isSomeonePairForAnotherOne) {
      throw new BadRequestException(USER_ALREADY_CHECKED);
    }
    await this.prismaService.user.update({
      where: { id: userPairId },
      data: {
        pairs: { connect: { id: user.id } },
      },
    });

    await this.prismaService.checkedUsers.create({
      data: { wasCheckedId: user.id, checkedId: userPairId },
    });
  }
}
