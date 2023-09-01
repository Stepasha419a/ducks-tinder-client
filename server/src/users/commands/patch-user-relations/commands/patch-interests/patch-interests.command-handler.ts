import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchInterestsCommand } from './patch-interests.command';
import { PrismaService } from 'prisma/prisma.service';
import { compareUserRelationFieldIds } from '../../helpers';

@CommandHandler(PatchInterestsCommand)
export class PatchInterestsCommandHandler
  implements ICommandHandler<PatchInterestsCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchInterestsCommand): Promise<void> {
    const { user, interests } = command;

    const interestIds = await this.prismaService.interest.findMany({
      where: { users: { some: { id: user.id } } },
      select: { id: true },
    });
    const updatedInterestIds = await this.prismaService.interest.findMany({
      where: { name: { in: interests } },
      select: { id: true },
    });

    const { toConnect, toDisconnect } = compareUserRelationFieldIds(
      interestIds,
      updatedInterestIds,
    );

    if (toConnect.length) {
      await this.prismaService.$transaction(
        toConnect.map((field) =>
          this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { connect: { id: field.id } } },
          }),
        ),
      );
    }
    if (toDisconnect.length) {
      await this.prismaService.$transaction(
        toDisconnect.map((field) =>
          this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { disconnect: { id: field.id } } },
          }),
        ),
      );
    }
  }
}
