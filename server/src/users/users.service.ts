import { UpdateUserDto } from './dto/updated-user.dto';
import { SavePictureDto } from './dto/save-picture.dto';
import { User, UserDocument } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from '../files/files.service';
import { UserPairDto } from './dto/user-pair.dto';
import { DeletePictoreDto } from './dto/delete-picture.dto';
import { UserDto } from './dto/user.dto';
import { UserSortsDto } from './dto/user-sorts.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly filesService: FilesService,
  ) {}

  async getAll(): Promise<UserDto[]> {
    return this.userModel.find();
  }

  async getOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('Such user was not found', HttpStatus.NOT_FOUND);
    }

    const userData = new UserDto(user);
    return userData;
  }

  async getByEmail(email: string): Promise<UserDto> {
    return this.userModel.findOne({ email });
  }

  async getSorted(sortsDto: UserSortsDto): Promise<UserDto> {
    const user: User = await this.userModel.findOne({
      _id: { $nin: sortsDto.userIds },
      'partnerSettings.distance': { $gt: 0, $lt: sortsDto.distance },
      age: { $gt: sortsDto.preferAge.from - 1, $lt: sortsDto.preferAge.to + 1 },
      'partnerSettings.age.from': { $lt: sortsDto.age + 1 },
      'partnerSettings.age.to': { $gt: sortsDto.age - 1 },
      sex: sortsDto.preferSex,
      'partnerSettings.preferSex': sortsDto.sex,
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
    const user = await this.userModel.create(userDto);

    const userData = new UserDto(user);

    return userData;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });

    if (userDto.pictures) {
      this.filesService.changePicturesDir(user._id, user.pictures.avatar);
    }

    const userData = new UserDto(user);

    return userData;
  }

  async delete(id: string): Promise<UserDto> {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new HttpException(
        'User with such id is not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = new UserDto(user);

    return userData;
  }

  async savePicture(
    dto: SavePictureDto,
    picture: Express.Multer.File,
  ): Promise<UserDto> {
    const fileName = this.filesService.savePicture(
      picture,
      dto.userId,
      dto.setting,
    );

    const user = await this.userModel.findById(dto.userId);

    if (dto.setting === 'avatar') {
      user.pictures.avatar = fileName;
    } else {
      user.pictures.gallery.push(fileName);
    }

    const newUser = await this.userModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    const userData = new UserDto(newUser);

    return userData;
  }

  async deletePicture(dto: DeletePictoreDto): Promise<UserDto> {
    const user = await this.userModel.findById(dto.userId);

    if (!user.pictures[dto.setting])
      throw new HttpException(
        'Pictures were not found',
        HttpStatus.BAD_REQUEST,
      );

    if (dto.setting === 'gallery') {
      if (!user.pictures.gallery.includes(dto.pictureName))
        throw new HttpException(
          `Picture with such a name ${dto.pictureName} was not found`,
          HttpStatus.BAD_REQUEST,
        );
      const fileName = this.filesService.deletePicture(
        dto.pictureName,
        dto.userId,
        dto.setting,
      );
      const fileIndex = user.pictures.gallery.indexOf(fileName);

      user.pictures.gallery.splice(fileIndex, 1);
    } else {
      this.filesService.deletePicture(dto.pictureName, dto.userId, dto.setting);
      user.pictures.avatar = '';
    }

    const newUser = await this.userModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    const userData = new UserDto(newUser);

    return userData;
  }

  async createPair(userPairDto: UserPairDto): Promise<UserDto> {
    const user = await this.userModel
      .findById(userPairDto.forUserId)
      .catch(() => {
        throw new HttpException(
          `User with such an id ${userPairDto.forUserId} was not found`,
          HttpStatus.BAD_REQUEST,
        );
      });

    const userPair = await this.userModel
      .findById(userPairDto.userId)
      .catch(() => {
        throw new HttpException(
          `User with such an id ${userPairDto.userId} was not found`,
          HttpStatus.BAD_REQUEST,
        );
      });

    if (!user.pairs.includes(userPair._id)) {
      user.pairs = [...user.pairs, userPair._id.toString()];

      await this.userModel.findByIdAndUpdate(user._id, user, { new: true });
    } else {
      throw new HttpException(
        'Pair with such an id already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = new UserDto(user);

    return userData;
  }

  async deletePair(userPairDto: UserPairDto): Promise<UserDto> {
    const user = await this.userModel
      .findById(userPairDto.forUserId)
      .catch(() => {
        throw new HttpException(
          `User with such an id ${userPairDto.forUserId} was not found`,
          HttpStatus.BAD_REQUEST,
        );
      });

    const userPair = await this.userModel
      .findById(userPairDto.userId)
      .catch(() => {
        throw new HttpException(
          `User with such an id ${userPairDto.userId} was not found`,
          HttpStatus.BAD_REQUEST,
        );
      });

    if (user.pairs.includes(userPair._id)) {
      const memberIdIndex = user.pairs.findIndex(
        (memberId: string) => memberId === userPair._id.toString(),
      );

      const newUserPairs = [...user.pairs];
      newUserPairs.splice(memberIdIndex, 1);

      user.pairs = [...newUserPairs];
      await this.userModel.findByIdAndUpdate(user._id, user, { new: true });
    } else {
      throw new HttpException(
        'Pair with such an id was not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = new UserDto(user);

    return userData;
  }
}
