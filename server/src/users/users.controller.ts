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
  MixPicturesDto,
} from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  DeletePairCommand,
  DeletePictureCommand,
  DislikeUserCommand,
  LikeUserCommand,
  MixPicturesCommand,
  PatchUserCommand,
  ReturnUserCommand,
  SavePictureCommand,
} from './commands';
import { GetPairsQuery, GetSortedQuery } from './queries';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  patch(@Req() req: UserRequest, @Body() dto: UpdateUserDto): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserCommand(req.user, dto));
  }

  @Get('sorted')
  @HttpCode(HttpStatus.OK)
  getSortedUser(@Req() req: UserRequest): Promise<ShortUser> {
    return this.queryBus.execute(new GetSortedQuery(req.user));
  }

  @Post('picture')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture'))
  savePicture(
    @Req() req: UserRequest,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<UserDto> {
    return this.commandBus.execute(new SavePictureCommand(req.user, picture));
  }

  @Put('picture')
  @HttpCode(HttpStatus.OK)
  deletePicture(
    @Req() req: UserRequest,
    @Body() dto: DeletePictureDto,
  ): Promise<UserDto> {
    return this.commandBus.execute(new DeletePictureCommand(req.user, dto));
  }

  @Put('picture/mix')
  @HttpCode(HttpStatus.OK)
  mixPictures(
    @Req() req: UserRequest,
    @Body() dto: MixPicturesDto,
  ): Promise<UserDto> {
    return this.commandBus.execute(new MixPicturesCommand(req.user, dto));
  }

  @Post('like/:id')
  @HttpCode(HttpStatus.OK)
  likeUser(
    @Req() req: UserRequest,
    @Param('id') userPairId: string,
  ): Promise<void> {
    return this.commandBus.execute(new LikeUserCommand(req.user, userPairId));
  }

  @Post('dislike/:id')
  @HttpCode(HttpStatus.OK)
  dislikeUser(
    @Req() req: UserRequest,
    @Param('id') userPairId: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new DislikeUserCommand(req.user, userPairId),
    );
  }

  @Put('return')
  @HttpCode(HttpStatus.OK)
  returnUser(@Req() req: UserRequest): Promise<void> {
    return this.commandBus.execute(new ReturnUserCommand(req.user));
  }

  @Get('pairs')
  @HttpCode(HttpStatus.OK)
  getPairs(@Req() req: UserRequest): Promise<ShortUser[]> {
    return this.queryBus.execute(new GetPairsQuery(req.user));
  }

  @Put('pairs/:id')
  @HttpCode(HttpStatus.OK)
  deletePair(
    @Req() req: UserRequest,
    @Param('id') userPairId: string,
  ): Promise<ShortUser[]> {
    return this.commandBus.execute(new DeletePairCommand(req.user, userPairId));
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
