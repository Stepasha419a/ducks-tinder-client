import { SavePictoreDto } from './dto/save-picture.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ISorts, IUserDto } from './users.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserPairDto } from './dto/user-pair.dto';
import { DeletePictoreDto } from './dto/delete-picture.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<UserDto[]> {
        return this.usersService.getAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id): Promise<UserDto> {
        return this.usersService.getOne(id)
    }

    @Post('sorted')
    @HttpCode(HttpStatus.OK)
    getSortedUser(@Body() sorts: ISorts): Promise<UserDto> {
        return this.usersService.getSorted(sorts)
    }

    @Post('picture')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('picture'))
    savePicture(@Body() dto: SavePictoreDto, @UploadedFile() picture: Express.Multer.File): Promise<UserDto> {
        return this.usersService.savePicture(dto, picture)
    }

    @Put('picture')
    @HttpCode(HttpStatus.OK)
    deletePicture(@Body() dto: DeletePictoreDto): Promise<UserDto> {
        return this.usersService.deletePicture(dto)
    }

    @Post('pairs')
    @HttpCode(HttpStatus.OK)
    createPair(@Body() userPairDto: UserPairDto): Promise<UserDto> {
        return this.usersService.createPair(userPairDto)
    }

    @Put('pairs')
    @HttpCode(HttpStatus.OK)
    deletePair(@Body() userPairDto: UserPairDto): Promise<UserDto> {
        return this.usersService.deletePair(userPairDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<UserDto> {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string): Promise<UserDto> {
        return this.usersService.delete(id)
    }
}