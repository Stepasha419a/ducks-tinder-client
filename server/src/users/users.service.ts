import { UsersSelector } from './utils/users.selector';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { User } from '@prisma/client';
import { UsersMapper } from './utils';
import { ShortUser } from './users.interface';
import {
  UpdateUserDto,
  UserSortsDto,
  UserDto,
  DeletePictureDto,
  UserPairDto,
  SavePictureDto,
  CreateUserDto,
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

    const userData = new UserDto(user);
    return userData;
  }

  async getByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: UsersSelector.selectUser(),
    });
  }

  async getSorted(sortsDto: UserSortsDto): Promise<ShortUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: { notIn: sortsDto.userIds },
        distance: { gt: 0, lte: sortsDto.distance },
        age: {
          gt: sortsDto.preferAgeFrom - 1,
          lt: sortsDto.preferAgeTo + 1,
        },
        preferAgeFrom: {
          lt: sortsDto.age + 1,
        },
        preferAgeTo: {
          gt: sortsDto.age - 1,
        },
        sex: sortsDto.preferSex,
        preferSex: sortsDto.sex,
      },
      select: UsersSelector.selectShortUser(),
    });

    if (!user) {
      throw new NotFoundException(
        'Such user was not found, try to change settings',
      );
    }

    const userData = new UserDto(user);

    return userData;
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: userDto,
      include: UsersSelector.selectUser(),
    });

    const userData = new UserDto(user);

    return userData;
  }

  async patch(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    // dto without interests to update user fields (interest = relation)
    const updateUserDto = { ...userDto, interests: undefined };

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userToInterests: {
          select: { interest: { select: { name: true } } },
        },
      },
    });

    if (
      userDto.interests &&
      (userDto.interests.length || userDto.interests.length === 0)
    ) {
      const existingInterests = await this.prismaService.interest.findMany({
        where: { name: { in: userDto.interests } },
      });
      await this.prismaService.userToInterests.deleteMany({
        where: { userId: user.id },
      });
      await Promise.all(
        existingInterests.map(async (interest) => {
          await this.prismaService.userToInterests.create({
            data: { userId: user.id, interestId: interest.id },
          });
        }),
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
      include: UsersSelector.selectUser(),
    });

    const userData = new UserDto(updatedUser);

    return userData;
  }

  async savePicture(
    dto: SavePictureDto,
    pictureFile: Express.Multer.File,
  ): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
      include: { pictures: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.pictures.length > 8) {
      throw new BadRequestException('you have max pictures count');
    }

    const fileName = await this.filesService.savePicture(
      pictureFile,
      dto.userId,
    );

    await this.prismaService.picture.create({
      data: { name: fileName, userId: user.id, order: user.pictures.length },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    const userData = new UserDto(updatedUser);

    return userData;
  }

  async deletePicture(dto: DeletePictureDto): Promise<UserDto> {
    const picture = await this.prismaService.picture.findFirst({
      where: { ...dto },
    });

    if (!picture) {
      throw new NotFoundException();
    }

    await this.filesService.deletePicture(picture.name, picture.userId);

    await this.prismaService.picture.delete({ where: { id: picture.id } });
    const user = await this.prismaService.user.findUnique({
      where: { id: picture.userId },
      include: { pictures: true },
    });

    await Promise.all(
      user.pictures
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

  async createPair(userPairDto: UserPairDto): Promise<ShortUser[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userId },
      include: { pairFor: { select: { userPairId: true } } },
    });

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    if (user.pairFor.find((pair) => pair.userPairId == userPair.id)) {
      throw new BadRequestException('Pair with such an id already exists');
    }
    await this.prismaService.pair.create({
      data: { userId: user.id, userPairId: userPair.id },
    });
    const updatedPairs = (
      await this.prismaService.pair.findMany({
        where: { userId: user.id },
        select: {
          userPair: {
            select: UsersSelector.selectShortUser(),
          },
        },
      })
    ).map((pair) => UsersMapper.mapUserPair(pair));

    return updatedPairs;
  }

  async deletePair(userPairDto: UserPairDto): Promise<ShortUser[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userId },
      include: { pairFor: { select: { userPairId: true, id: true } } },
    });

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    const deletedPair = user.pairFor.find(
      (pair) => pair.userPairId === userPair.id,
    );

    if (deletedPair) {
      await this.prismaService.pair.delete({ where: { id: deletedPair.id } });
    } else {
      throw new BadRequestException('Pair with such an id was not found');
    }

    const updatedPairs = (
      await this.prismaService.pair.findMany({
        where: { userId: user.id },
        select: {
          userPair: {
            select: UsersSelector.selectShortUser(),
          },
        },
      })
    ).map((pair) => UsersMapper.mapUserPair(pair));

    return updatedPairs;
  }
}
