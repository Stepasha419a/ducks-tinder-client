import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands';
import { GetUserByEmailQuery, GetUserQuery } from './queries';
import { UserDto, CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getUser(id: string): Promise<UserDto> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  // in progress (waiting for chats)
  /* async acceptPair(user: User, userPairDto: UserPairDto): Promise<ShortUser[]> {
    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: { id: true } } },
      })
    ).pairs;

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    if (!userPair) {
      throw new NotFoundException('Such user was not found');
    }

    if (pairs.find((pair) => pair.id == userPairDto.userPairId)) {
      throw new NotFoundException('Pair with such an id already exists');
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        pairs: { connect: { id: userPair.id } },
        checked: { connect: { id: userPair.id } },
      },
      select: {
        pairs: {
          select: UsersSelector.selectShortUser(),
        },
      },
    });

    return updatedUser.pairs;
  } */
}
