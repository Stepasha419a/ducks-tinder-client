import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Redirect } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {

    }

    /* @Get('/brokenUrl')
    @Redirect('/', 301)
    brokenUrl() {
        
    } */

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll() {
        return this.userService.getAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id) {
        return this.userService.getOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id:string) {
        return `updated with id: ${id}, name: ${updateUserDto.name}, age: ${updateUserDto.age}`
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return `remove: ${id}`
    }
}
