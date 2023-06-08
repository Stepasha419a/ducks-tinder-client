import { CommandBus } from '@nestjs/cqrs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto, UserTokenDto } from './dto';
import { UserData } from './auth.interface';
import { LoginCommand, RegisterCommand } from './commands';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly commandBus: CommandBus,
  ) {}

  async registration(dto: CreateUserDto): Promise<UserData> {
    return this.commandBus.execute(new RegisterCommand(dto));
  }

  async login(dto: LoginUserDto): Promise<UserData> {
    return this.commandBus.execute(new LoginCommand(dto));
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    await this.tokensService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<UserData> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = await this.tokensService.validateRefreshToken(
      refreshToken,
    );
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getOne(userData.id);
    const userTokenDto = new UserTokenDto({
      id: user.id,
      email: user.email,
    });
    const tokens = await this.tokensService.generateTokens({ ...userTokenDto });
    return { ...tokens, user };
  }
}
