import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetPairsCommand } from './get-pairs.command';
import { ShortUser } from 'users/users.interface';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(GetPairsCommand)
export class GetPairsHandler implements ICommandHandler<GetPairsCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: GetPairsCommand): Promise<ShortUser[]> {
    const { user } = command;

    return (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: {
          pairs: {
            select: UsersSelector.selectShortUser(),
          },
        },
      })
    ).pairs;
  }
}
