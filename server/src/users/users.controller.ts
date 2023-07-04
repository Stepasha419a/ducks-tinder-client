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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShortUser } from './users.interface';
import { UserRequest } from 'common/types';
import {
  DeletePictureDto,
  PatchUserDto,
  UserDto,
  MixPicturesDto,
  PatchUserPlaceDto,
} from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AcceptPairCommand,
  CreatePairsCommand,
  DeletePairCommand,
  DeletePictureCommand,
  DislikeUserCommand,
  LikeUserCommand,
  MixPicturesCommand,
  PatchUserCommand,
  PatchUserPlaceCommand,
  RemoveAllPairsCommand,
  ReturnUserCommand,
  SavePictureCommand,
} from './commands';
import { GetPairsQuery, GetSortedQuery } from './queries';
import { OptionalValidationPipe } from 'common/pipes';
import { ONE_MB_SIZE } from 'common/constants';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  patch(
    @Req() req: UserRequest,
    @Body(OptionalValidationPipe) dto: PatchUserDto,
  ): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserCommand(req.user, dto));
  }

  @Patch('place')
  @HttpCode(HttpStatus.OK)
  patchPlace(
    @Req() req: UserRequest,
    @Body() dto: PatchUserPlaceDto,
  ): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserPlaceCommand(req.user, dto));
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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: ONE_MB_SIZE }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    picture: Express.Multer.File,
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

  @Post('pairs/:id')
  @HttpCode(HttpStatus.OK)
  acceptPair(
    @Req() req: UserRequest,
    @Param('id') userPairId: string,
  ): Promise<ShortUser[]> {
    return this.commandBus.execute(new AcceptPairCommand(req.user, userPairId));
  }

  @Put('pairs/:id')
  @HttpCode(HttpStatus.OK)
  deletePair(
    @Req() req: UserRequest,
    @Param('id') userPairId: string,
  ): Promise<ShortUser[]> {
    return this.commandBus.execute(new DeletePairCommand(req.user, userPairId));
  }

  // for dev
  @Patch('removeAllPairs')
  @HttpCode(HttpStatus.OK)
  removeAllPairs(@Req() req: UserRequest) {
    return this.commandBus.execute(new RemoveAllPairsCommand(req.user));
  }

  // for dev
  @Post('createPairs')
  @HttpCode(HttpStatus.OK)
  createPairs(@Req() req: UserRequest) {
    return this.commandBus.execute(new CreatePairsCommand(req.user));
  }
}
