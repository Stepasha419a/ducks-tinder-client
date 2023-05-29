import { UsersSelector } from './utils/users.selector';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { User } from '@prisma/client';
import { ShortUser } from './users.interface';
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

  async getSorted(user: User): Promise<ShortUser> {
    const wasCheckedUserIds = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = wasCheckedUserIds.checked.map((checked) => checked.id);
    const wasCheckedIds = wasCheckedUserIds.wasChecked.map(
      (wasChecked) => wasChecked.id,
    );

    const sortedUser = await this.prismaService.user.findFirst({
      where: {
        id: { notIn: [...checkedIds, ...wasCheckedIds] },
        distance: { gt: 0, lte: user.distance },
        age: {
          gte: user.preferAgeFrom,
          lte: user.preferAgeTo,
        },
        preferAgeFrom: {
          lte: user.age,
        },
        preferAgeTo: {
          gte: user.age,
        },
        sex: user.preferSex,
        preferSex: user.sex,
      },
      select: UsersSelector.selectShortUser(),
    });

    if (!sortedUser) {
      throw new NotFoundException(
        'Such user was not found, try to change settings',
      );
    }

    return new UserDto(sortedUser);
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: userDto,
      include: UsersSelector.selectUser(),
    });

    return new UserDto(user);
  }

  async patch(user: User, userDto: UpdateUserDto): Promise<UserDto> {
    // dto without interests to update user fields (interest = relation)
    const updateUserDto = { ...userDto, interests: undefined };

    const interests = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: {
          interests: true,
        },
      })
    ).interests;

    if (
      userDto.interests &&
      (userDto.interests.length || userDto.interests.length === 0)
    ) {
      const existingInterests = await this.prismaService.interest.findMany({
        where: { name: { in: userDto.interests } },
      });
      // TODO: do this with comparison
      await Promise.all(
        interests.map(async (interest) => {
          await this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { disconnect: { id: interest.id } } },
          });
        }),
      );
      await Promise.all(
        existingInterests.map(async (interest) => {
          await this.prismaService.user.update({
            where: { id: user.id },
            data: { interests: { connect: { id: interest.id } } },
          });
        }),
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { ...updateUserDto },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
  }

  async savePicture(
    user: User,
    pictureFile: Express.Multer.File,
  ): Promise<UserDto> {
    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    if (pictures.length > 8) {
      throw new BadRequestException('You have max pictures count');
    }

    const fileName = await this.filesService.savePicture(pictureFile, user.id);

    await this.prismaService.picture.create({
      data: { name: fileName, userId: user.id, order: pictures.length },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
  }

  async deletePicture(user: User, dto: DeletePictureDto): Promise<UserDto> {
    const picture = await this.prismaService.picture.findFirst({
      where: dto,
    });

    if (!picture) {
      throw new NotFoundException();
    }

    await this.filesService.deletePicture(picture.name, picture.userId);

    await this.prismaService.picture.delete({ where: { id: picture.id } });
    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    await Promise.all(
      pictures
        .filter((pictureItem) => pictureItem.order > picture.order)
        .map(async (pictureItem) => {
          return this.prismaService.picture.update({
            where: { id: pictureItem.id },
            data: { order: pictureItem.order - 1 },
          });
        }),
    );

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
  }

  async mixPictures(user: User, dto: MixPicturesDto): Promise<UserDto> {
    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    const mixPicture = pictures.find((pic) => pic.order === dto.mixOrder);
    const withPicture = pictures.find((pic) => pic.order === dto.withOrder);
    if (!mixPicture || !withPicture) {
      throw new NotFoundException();
    }

    await this.prismaService.picture.update({
      where: { id: mixPicture.id },
      data: { order: dto.withOrder },
    });
    await this.prismaService.picture.update({
      where: { id: withPicture.id },
      data: { order: dto.mixOrder },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
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

  async likeUser(user: User, userPairId: string) {
    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairId },
    });
    if (!userPair) {
      throw new NotFoundException('Such user was not found');
    }

    const wasCheckedUserIds = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = wasCheckedUserIds.checked.map((checked) => checked.id);
    const wasCheckedIds = wasCheckedUserIds.wasChecked.map(
      (wasChecked) => wasChecked.id,
    );

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

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { checked: { connect: { id: userPairId } } },
    });
  }

  async dislikeUser(user: User, userPairId: string) {
    const wasCheckedUserIds = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
    const checkedIds = wasCheckedUserIds.checked.map((checked) => checked.id);
    const wasCheckedIds = wasCheckedUserIds.wasChecked.map(
      (wasChecked) => wasChecked.id,
    );
    if (
      [...checkedIds, ...wasCheckedIds].find((userId) => userId === userPairId)
    ) {
      throw new BadRequestException('User is already checked');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { checked: { connect: { id: userPairId } } },
    });
  }

  async returnUser(user: User, userPairId: string) {
    const checked = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { checked: { select: { id: true } } },
      })
    ).checked;

    const pairs = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: { id: true } } },
      })
    ).pairs;

    if (
      checked.find((checked) => checked.id === userPairId) &&
      !pairs.find((pair) => pair.id === userPairId)
    ) {
      throw new NotFoundException('Pair with such an id already exists');
    }
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        checked: { disconnect: { id: userPairId } },
      },
    });
  }

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
    const checked = (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { checked: { select: { id: true } } },
      })
    ).checked;
    await Promise.all(
      checked.map(async (checkedUser) => {
        await this.prismaService.user.update({
          where: { id: user.id },
          data: { checked: { disconnect: { id: checkedUser.id } } },
        });
      }),
    );
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
