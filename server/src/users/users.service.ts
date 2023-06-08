import { UsersSelector } from './users.selector';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CommandBus } from '@nestjs/cqrs';
import { ShortUser } from './users.interface';
import {
  DeletePairCommand,
  DeletePictureCommand,
  DislikeUserCommand,
  GetPairsCommand,
  GetSortedCommand,
  LikeUserCommand,
  MixPicturesCommand,
  PatchUserCommand,
  SavePictureCommand,
} from './commands';
import {
  UpdateUserDto,
  UserDto,
  DeletePictureDto,
  CreateUserDto,
  MixPicturesDto,
} from './dto';
import { ReturnUserCommand } from './commands/return-user';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  async getOne(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: UsersSelector.selectUser(),
    });

    if (!user) {
      throw new NotFoundException('Such user was not found');
    }

    return new UserDto(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: UsersSelector.selectUser(),
    });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: userDto,
      include: UsersSelector.selectUser(),
    });

    return new UserDto(user);
  }

  async patch(user: User, dto: UpdateUserDto): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserCommand(user, dto));
  }

  async getSorted(user: User): Promise<ShortUser> {
    return this.commandBus.execute(new GetSortedCommand(user));
  }

  async savePicture(
    user: User,
    picture: Express.Multer.File,
  ): Promise<UserDto> {
    return this.commandBus.execute(new SavePictureCommand(user, picture));
  }

  async deletePicture(user: User, dto: DeletePictureDto): Promise<UserDto> {
    return this.commandBus.execute(new DeletePictureCommand(user, dto));
  }

  async mixPictures(user: User, dto: MixPicturesDto): Promise<UserDto> {
    return this.commandBus.execute(new MixPicturesCommand(user, dto));
  }

  async likeUser(user: User, userPairId: string) {
    return this.commandBus.execute(new LikeUserCommand(user, userPairId));
  }

  async dislikeUser(user: User, userPairId: string) {
    return this.commandBus.execute(new DislikeUserCommand(user, userPairId));
  }

  async returnUser(user: User): Promise<void> {
    return this.commandBus.execute(new ReturnUserCommand(user));
  }

  async getPairs(user: User): Promise<ShortUser[]> {
    return this.commandBus.execute(new GetPairsCommand(user));
  }

  // for dev
  async removeAllPairs(user: User) {
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

  async deletePair(user: User, userPairId: string): Promise<ShortUser[]> {
    return this.commandBus.execute(new DeletePairCommand(user, userPairId));
  }
}
