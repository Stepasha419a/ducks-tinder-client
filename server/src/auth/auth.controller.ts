import { LoginUserDto } from './../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, HttpCode, Post, HttpStatus, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    @HttpCode(HttpStatus.OK)
    async registration(@Body() dto: CreateUserDto, @Res() response: Response) {
        const userData = await this.authService.registration(dto)

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        response.json(userData)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Res() response: Response, @Body() dto: LoginUserDto) {
        const userData = await this.authService.login(dto, response)

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        response.json(userData)
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    logout(@Req() request: Request) {
        const {refreshToken} = request.cookies

        return this.authService.logout(refreshToken)
    }

    @Get('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() request: Request, @Res() response: Response) {
        const {refreshToken} = request.cookies

        const userData = await this.authService.refresh(refreshToken)

        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        response.json(userData)
    }
}
