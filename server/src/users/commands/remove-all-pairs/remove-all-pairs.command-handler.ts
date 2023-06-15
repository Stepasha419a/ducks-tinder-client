import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveAllPairsCommand } from './remove-all-pairs.command';
import { PrismaService } from 'prisma/prisma.service';

// for dev
@CommandHandler(RemoveAllPairsCommand)
export class RemoveAllPairsCommandHandler
  implements ICommandHandler<RemoveAllPairsCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: RemoveAllPairsCommand) {
    const { user } = command;

    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairFor: { select: { id: true } } },
      })
    ).pairFor;
    await Promise.all(
      pairs.map(async (pair) => {
        await this.prismaService.user.update({
          where: { id: pair.id },
          data: { pairs: { disconnect: { id: user.id } } },
        });
      }),
    );
    await this.prismaService.checkedUsers.deleteMany({
      where: { wasCheckedId: user.id },
    });
  }
}
