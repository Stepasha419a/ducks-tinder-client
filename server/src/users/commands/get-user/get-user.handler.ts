import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetUserCommand } from './get-user.command';
import { UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(GetUserCommand)
export class GetUserHandler implements ICommandHandler<GetUserCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: GetUserCommand): Promise<UserDto> {
    const { id } = command;

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: UsersSelector.selectUser(),
    });

    if (!user) {
      throw new NotFoundException('Such user was not found');
    }

    return new UserDto(user);
  }
}
