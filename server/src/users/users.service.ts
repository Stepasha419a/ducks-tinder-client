import { UsersSelector } from './users.selector';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { User } from '@prisma/client';
import { CommandBus } from '@nestjs/cqrs';
import { ShortUser } from './users.interface';
import {
  DeletePictureCommand,
  GetSortedCommand,
  MixPicturesCommand,
  PatchUserCommand,
  SavePictureCommand,
} from './commands';
import {
  UpdateUserDto,
  UserDto,
  DeletePictureDto,
  UserPairDto,
  CreateUserDto,
  MixPicturesDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commandBus: CommandBus,
    private readonly filesService: FilesService,
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
    if (user.id === userPairId) {
      throw new BadRequestException('You can not like yourself');
    }

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException('Such user was not found');
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
      throw new BadRequestException(
        'Pair with such an id already exists or such user is already checked',
      );
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

  async dislikeUser(user: User, userPairId: string) {
    if (user.id === userPairId) {
      throw new BadRequestException('You can not dislike yourself');
    }

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException('Such user was not found');
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
      throw new BadRequestException('User is already checked');
    }

    await this.prismaService.checkedUsers.create({
      data: { wasCheckedId: user.id, checkedId: userPairId },
    });
  }

  async returnUser(user: User) {
    const pairIds = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairFor: { select: { id: true } } },
      })
    ).pairFor.map((pair) => pair.id);

    const checkedUser = await this.prismaService.checkedUsers.findFirst({
      where: {
        wasCheckedId: user.id,
        checked: { id: { notIn: pairIds } },
      },
    });
    if (!checkedUser) {
      throw new NotFoundException();
    }

    await this.prismaService.checkedUsers.delete({
      where: {
        checkedId_wasCheckedId: {
          checkedId: checkedUser.checkedId,
          wasCheckedId: checkedUser.wasCheckedId,
        },
      },
    });
  }

  async getPairs(user: User): Promise<ShortUser[]> {
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

  async deletePair(user: User, userPairDto: UserPairDto): Promise<ShortUser[]> {
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

    const deletedPair = pairs.find((pair) => pair.id === userPair.id);

    if (deletedPair) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { pairs: { disconnect: { id: deletedPair.id } } },
      });
    } else {
      throw new NotFoundException('Pair with such an id was not found');
    }

    const updatedPairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      })
    ).pairs;

    return updatedPairs;
  }
}
