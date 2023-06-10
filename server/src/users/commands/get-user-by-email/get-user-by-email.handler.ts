import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { User } from '@prisma/client';
import { GetUserByEmailCommand } from './get-user-by-email.command';

@CommandHandler(GetUserByEmailCommand)
export class GetUserByEmailHandler
  implements ICommandHandler<GetUserByEmailCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: GetUserByEmailCommand): Promise<User> {
    const { email } = command;

    return this.prismaService.user.findUnique({
      where: { email },
      include: UsersSelector.selectUser(),
    });
  }
}
