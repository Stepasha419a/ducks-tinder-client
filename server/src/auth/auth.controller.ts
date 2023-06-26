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
import { REFRESH_TOKEN_TIME } from 'tokens/tokens.constants';
import { CreateUserDto } from 'users/dto';
import { LoginUserDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
} from './commands';
import { AuthDataReturn, UserData } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('registration')
  @HttpCode(HttpStatus.OK)
  async registration(
    @Res() res: Response,
    @Body() dto: CreateUserDto,
  ): Promise<Response<UserData>> {
    const userData: AuthDataReturn = await this.commandBus.execute(
      new RegisterCommand(dto),
    );
    this.setCookies(res, userData.refreshToken);

    return res.json(userData.data);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res() res: Response,
    @Body() dto: LoginUserDto,
  ): Promise<Response<UserData>> {
    const userData: AuthDataReturn = await this.commandBus.execute(
      new LoginCommand(dto),
    );
    this.setCookies(res, userData.refreshToken);

    return res.json(userData.data);
  }

  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<void>> {
    const { refreshToken } = req.cookies;

    this.clearCookies(res);
    await this.commandBus.execute(new LogoutCommand(refreshToken));

    return res.end();
  }

  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<UserData>> {
    const { refreshToken } = req.cookies;

    const userData: AuthDataReturn = await this.commandBus.execute(
      new RefreshCommand(refreshToken),
    );
    this.setCookies(res, userData.refreshToken);

    return res.json(userData.data);
  }

  private setCookies(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_TIME,
      httpOnly: true,
    });
  }

  private clearCookies(res: Response) {
    res.clearCookie('refreshToken');
  }
}
