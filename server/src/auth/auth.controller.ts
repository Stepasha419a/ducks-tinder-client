import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Get,
  Req,
  Res,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'common/decorators';
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from 'tokens/tokens.constants';
import { AuthService } from './auth.service';
import { CreateUserDto, UserDto } from 'users/dto';
import { LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('registration')
  @HttpCode(HttpStatus.OK)
  async registration(
    @Body() dto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    const userData = await this.authService.registration(dto);
    this.setCookies(res, userData.refreshToken, userData.accessToken);

    return res.json(userData.user);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res() res: Response,
    @Body() dto: LoginUserDto,
  ): Promise<Response<UserDto>> {
    const userData = await this.authService.login(dto);
    this.setCookies(res, userData.refreshToken, userData.accessToken);

    return res.json(userData.user);
  }

  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { refreshToken } = req.cookies;

    this.clearCookies(res);
    await this.authService.logout(refreshToken);

    res.end();
  }

  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    const { refreshToken } = req.cookies;

    const userData = await this.authService.refresh(refreshToken);
    this.setCookies(res, userData.refreshToken, userData.accessToken);

    return res.json(userData.user);
  }

  private setCookies(res: Response, refreshToken: string, accessToken: string) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_TIME,
      httpOnly: true,
    });
    res.cookie('accessToken', accessToken, {
      maxAge: ACCESS_TOKEN_TIME,
      httpOnly: true,
    });
  }

  private clearCookies(res: Response) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }
}
