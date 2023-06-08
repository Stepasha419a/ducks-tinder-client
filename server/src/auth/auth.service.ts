import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { UserData } from './auth.interface';
import {
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
} from './commands';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async registration(dto: CreateUserDto): Promise<UserData> {
    return this.commandBus.execute(new RegisterCommand(dto));
  }

  async login(dto: LoginUserDto): Promise<UserData> {
    return this.commandBus.execute(new LoginCommand(dto));
  }

  async logout(refreshToken: string): Promise<void> {
    return this.commandBus.execute(new LogoutCommand(refreshToken));
  }

  async refresh(refreshToken: string): Promise<UserData> {
    return this.commandBus.execute(new RefreshCommand(refreshToken));
  }
}
