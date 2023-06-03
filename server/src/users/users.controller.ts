import { UsersService } from './users.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Patch,
  Get,
  UploadedFile,
  UseInterceptors,
  Req,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShortUser } from './users.interface';
import { UserRequest } from 'common/types';
import {
  DeletePictureDto,
  UpdateUserDto,
  UserDto,
  UserPairDto,
  MixPicturesDto,
} from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  patch(@Req() req: UserRequest, @Body() dto: UpdateUserDto): Promise<UserDto> {
    return this.usersService.patch(req.user, dto);
  }

  @Get('sorted')
  @HttpCode(HttpStatus.OK)
  getSortedUser(@Req() req: UserRequest): Promise<ShortUser> {
    return this.usersService.getSorted(req.user);
  }

  @Post('picture')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture'))
  savePicture(
    @Req() req: UserRequest,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<UserDto> {
    return this.usersService.savePicture(req.user, picture);
  }

  @Put('picture')
  @HttpCode(HttpStatus.OK)
  deletePicture(
    @Req() req: UserRequest,
    @Body() dto: DeletePictureDto,
  ): Promise<UserDto> {
    return this.usersService.deletePicture(req.user, dto);
  }

  @Put('picture/mix')
  @HttpCode(HttpStatus.OK)
  mixPictures(
    @Req() req: UserRequest,
    @Body() dto: MixPicturesDto,
  ): Promise<UserDto> {
    return this.usersService.mixPictures(req.user, dto);
  }

  @Post('like/:id')
  @HttpCode(HttpStatus.OK)
  likeUser(@Req() req: UserRequest, @Param('id') id: string): Promise<void> {
    return this.usersService.likeUser(req.user, id);
  }

  @Post('dislike/:id')
  @HttpCode(HttpStatus.OK)
  dislikeUser(@Req() req: UserRequest, @Param('id') id: string): Promise<void> {
    return this.usersService.dislikeUser(req.user, id);
  }

  @Put('return')
  @HttpCode(HttpStatus.OK)
  returnUser(@Req() req: UserRequest): Promise<void> {
    return this.usersService.returnUser(req.user);
  }

  @Get('pairs')
  @HttpCode(HttpStatus.OK)
  getPairs(@Req() req: UserRequest): Promise<ShortUser[]> {
    return this.usersService.getPairs(req.user);
  }

  @Put('pairs')
  @HttpCode(HttpStatus.OK)
  deletePair(
    @Req() req: UserRequest,
    @Body() dto: UserPairDto,
  ): Promise<ShortUser[]> {
    return this.usersService.deletePair(req.user, dto);
  }

  // for dev
  @Post('removeAllPairs')
  @HttpCode(HttpStatus.OK)
  removeAllParis(@Req() req: UserRequest) {
    return this.usersService.removeAllPairs(req.user);
  }

  // TODO: finish it when finish with chats logic
  /* @Post('pairs')
  @HttpCode(HttpStatus.OK)
  acceptPair(
    @Req() req: UserRequest,
    @Body() dto: UserPairDto,
  ): Promise<ShortUser[]> {
    return this.usersService.acceptPair(req.user, dto);
  } */
}
