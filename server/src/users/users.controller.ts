import { UpdateUserDto } from './dto/updated-user.dto';
import { AuthGuard } from './../auth/auth.guard';
import { SavePictureDto } from './dto/save-picture.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserPairDto } from './dto/user-pair.dto';
import { DeletePictureDto } from './dto/delete-picture.dto';
import { UserDto } from './dto/user.dto';
import { UserSortsDto } from './dto/user-sorts.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<UserDto[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id): Promise<UserDto> {
    return this.usersService.getOne(id);
  }

  @Post('sorted')
  @HttpCode(HttpStatus.OK)
  getSortedUser(@Body() dto: UserSortsDto): Promise<UserDto> {
    return this.usersService.getSorted(dto);
  }

  @Post('picture')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('picture'))
  savePicture(
    @Body() dto: SavePictureDto,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<UserDto> {
    return this.usersService.savePicture(dto, picture);
  }

  @Put('picture')
  @HttpCode(HttpStatus.OK)
  deletePicture(@Body() dto: DeletePictureDto): Promise<UserDto> {
    return this.usersService.deletePicture(dto);
  }

  @Post('pairs')
  @HttpCode(HttpStatus.OK)
  createPair(@Body() dto: UserPairDto): Promise<UserDto> {
    return this.usersService.createPair(dto);
  }

  @Put('pairs')
  @HttpCode(HttpStatus.OK)
  deletePair(@Body() dto: UserPairDto): Promise<UserDto> {
    return this.usersService.deletePair(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserDto> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.delete(id);
  }
}
