import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { FullUser } from 'users/users.interface';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: GetUserByEmailQuery): Promise<FullUser | void> {
    const { email } = command;

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { email } } },
    });
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: UsersSelector.selectUser(),
    });

    if (user) {
      return {
        ...user,
        pairsCount,
      };
    }
  }
}
