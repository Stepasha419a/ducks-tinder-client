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
  Param,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShortUser } from './users.interface';
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
import { User } from 'common/decorators';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  patch(
    @User() user,
    @Body(OptionalValidationPipe) dto: PatchUserDto,
  ): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserCommand(user, dto));
  }

  @Patch('place')
  @HttpCode(HttpStatus.OK)
  patchPlace(@User() user, @Body() dto: PatchUserPlaceDto): Promise<UserDto> {
    return this.commandBus.execute(new PatchUserPlaceCommand(user, dto));
  }

  @Get('sorted')
  @HttpCode(HttpStatus.OK)
  getSortedUser(@User() user): Promise<ShortUser> {
    return this.queryBus.execute(new GetSortedQuery(user));
  }

  @Post('picture')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture'))
  savePicture(
    @User() user,
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
    return this.commandBus.execute(new SavePictureCommand(user, picture));
  }

  @Put('picture')
  @HttpCode(HttpStatus.OK)
  deletePicture(@User() user, @Body() dto: DeletePictureDto): Promise<UserDto> {
    return this.commandBus.execute(new DeletePictureCommand(user, dto));
  }

  @Put('picture/mix')
  @HttpCode(HttpStatus.OK)
  mixPictures(@User() user, @Body() dto: MixPicturesDto): Promise<UserDto> {
    return this.commandBus.execute(new MixPicturesCommand(user, dto));
  }

  @Post('like/:id')
  @HttpCode(HttpStatus.OK)
  likeUser(@User() user, @Param('id') userPairId: string): Promise<void> {
    return this.commandBus.execute(new LikeUserCommand(user, userPairId));
  }

  @Post('dislike/:id')
  @HttpCode(HttpStatus.OK)
  dislikeUser(@User() user, @Param('id') userPairId: string): Promise<void> {
    return this.commandBus.execute(new DislikeUserCommand(user, userPairId));
  }

  @Put('return')
  @HttpCode(HttpStatus.OK)
  returnUser(@User() user): Promise<void> {
    return this.commandBus.execute(new ReturnUserCommand(user));
  }

  @Get('pairs')
  @HttpCode(HttpStatus.OK)
  getPairs(@User() user): Promise<ShortUser[]> {
    return this.queryBus.execute(new GetPairsQuery(user));
  }

  @Post('pairs/:id')
  @HttpCode(HttpStatus.OK)
  acceptPair(
    @User() user,
    @Param('id') userPairId: string,
  ): Promise<ShortUser[]> {
    return this.commandBus.execute(new AcceptPairCommand(user, userPairId));
  }

  @Put('pairs/:id')
  @HttpCode(HttpStatus.OK)
  deletePair(
    @User() user,
    @Param('id') userPairId: string,
  ): Promise<ShortUser[]> {
    return this.commandBus.execute(new DeletePairCommand(user, userPairId));
  }

  // for dev
  @Patch('removeAllPairs')
  @HttpCode(HttpStatus.OK)
  removeAllPairs(@User() user) {
    return this.commandBus.execute(new RemoveAllPairsCommand(user));
  }

  // for dev
  @Post('createPairs')
  @HttpCode(HttpStatus.OK)
  createPairs(@User() user) {
    return this.commandBus.execute(new CreatePairsCommand(user));
  }
}
