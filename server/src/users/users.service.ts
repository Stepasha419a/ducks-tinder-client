import { PrismaService } from './../prisma/prisma.service';
import { UpdateUserDto } from './dto/updated-user.dto';
import { SavePictureDto } from './dto/save-picture.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { UserPairDto } from './dto/user-pair.dto';
import { DeletePictureDto } from './dto/delete-picture.dto';
import { UserDto } from './dto/user.dto';
import { UserSortsDto } from './dto/user-sorts.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async getOne(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { pictures: { select: { name: true, order: true } } },
    });

    if (!user) {
      throw new HttpException('Such user was not found', HttpStatus.NOT_FOUND);
    }

    const userData = new UserDto(user);
    return userData;
  }

  async getByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { pictures: { select: { name: true, order: true } } },
    });
  }

  async getSorted(sortsDto: UserSortsDto): Promise<UserDto> {
    const user: User = await this.prismaService.user.findFirst({
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
    });

    if (!user) {
      throw new HttpException(
        'Such user was not found, try to change settings',
        HttpStatus.NOT_FOUND,
      );
    }

    const userData = new UserDto(user);

    return userData;
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: userDto,
      include: { pictures: { select: { name: true, order: true } } },
    });

    const userData = new UserDto(user);

    return userData;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: userDto,
    });

    const userData = new UserDto(user);

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
      include: { pictures: { select: { name: true, order: true } } },
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
      include: { pictures: { select: { name: true, order: true } } },
    });

    return new UserDto(updatedUser);
  }

  async createPair(userPairDto: UserPairDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userId },
      include: { pairFor: { select: { userPairId: true } } },
    });

    const userPair = await this.prismaService.user.findUnique({
      where: { id: userPairDto.userPairId },
    });

    if (user.pairFor.find((pair) => pair.userPairId == userPair.id)) {
      throw new HttpException(
        'Pair with such an id already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prismaService.pair.create({
      data: { userId: user.id, userPairId: userPair.id },
    });
    const updatedPairs = (
      await this.prismaService.pair.findMany({
        where: { userId: user.id },
        select: {
          userPair: {
            select: {
              id: true,
              name: true,
              age: true,
              description: true,
              distance: true,
              interests: { select: { id: true, name: true } },
              pictures: { select: { name: true, order: true } },
            },
          },
        },
      })
    ).map((pair) => pair.userPair);

    return updatedPairs;
  }

  async deletePair(userPairDto: UserPairDto) {
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
      throw new HttpException(
        'Pair with such an id was not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPairs = (
      await this.prismaService.pair.findMany({
        where: { userId: user.id },
        select: {
          userPair: {
            select: {
              id: true,
              name: true,
              age: true,
              description: true,
              distance: true,
              interests: { select: { id: true, name: true } },
              pictures: { select: { name: true, order: true } },
            },
          },
        },
      })
    ).map((pair) => pair.userPair);

    return updatedPairs;
  }
}
