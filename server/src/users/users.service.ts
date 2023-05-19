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
  UserSortsDto,
  UserDto,
  DeletePictureDto,
  UserPairDto,
  SavePictureDto,
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
        interests: true,
      },
    });

    if (
      userDto.interests &&
      (userDto.interests.length || userDto.interests.length === 0)
    ) {
      const existingInterests = await this.prismaService.interest.findMany({
        where: { name: { in: userDto.interests } },
      });
      // TODO: do this with comparison
      await Promise.all(
        user.interests.map(async (interest) => {
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
      throw new NotFoundException('Such user was not found');
    }

    if (user.pictures.length > 8) {
      throw new BadRequestException('You have max pictures count');
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
      where: dto,
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

  async mixPictures(dto: MixPicturesDto): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
      include: { pictures: true },
    });
    if (!user) {
      throw new NotFoundException('Such user was not found');
    }

    const mixPicture = user.pictures.find((pic) => pic.order === dto.mixOrder);
    const withPicture = user.pictures.find(
      (pic) => pic.order === dto.withOrder,
    );
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

  async getPairs(id: string): Promise<ShortUser[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        pairs: {
          select: UsersSelector.selectShortUser(),
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Such user was not found');
    }

    return user.pairs;
  }

  async createPair(userPairDto: UserPairDto): Promise<ShortUser[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userId },
      include: { pairs: { select: { id: true } } },
    });
    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    if (!user || !userPair) {
      throw new NotFoundException('Such user was not found');
    }

    if (user.pairs.find((pair) => pair.id == userPairDto.userPairId)) {
      throw new NotFoundException('Pair with such an id already exists');
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { pairs: { connect: { id: userPair.id } } },
      select: {
        pairs: {
          select: UsersSelector.selectShortUser(),
        },
      },
    });
    return updatedUser.pairs;
  }

  async deletePair(userPairDto: UserPairDto): Promise<ShortUser[]> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userId },
      include: { pairs: { select: { id: true } } },
    });
    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    if (!user || !userPair) {
      throw new NotFoundException('Such user was not found');
    }

    const deletedPair = user.pairs.find((pair) => pair.id === userPair.id);

    if (deletedPair) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { pairs: { disconnect: { id: deletedPair.id } } },
      });
    } else {
      throw new NotFoundException('Pair with such an id was not found');
    }

    return (
      await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      })
    ).pairs;
  }
}
