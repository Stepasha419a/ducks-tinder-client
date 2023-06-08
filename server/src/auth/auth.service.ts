import { CommandBus } from '@nestjs/cqrs';
import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';
import { UserDto, CreateUserDto } from '../users/dto';
import { LoginUserDto, UserTokenDto } from './dto';
import { UserData } from './auth.interface';
import { RegisterCommand } from './commands';

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

  async login(loginUserDto: LoginUserDto): Promise<UserData> {
    const user = await this.usersService.getByEmail(loginUserDto.email);
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }

    const isPassEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPassEquals) {
      throw new ForbiddenException('Incorrect email or password');
    }

    const userDto = new UserDto(user);
    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });
    const tokens = await this.tokensService.generateTokens({ ...userTokenDto });

    return { ...tokens, user: userDto };
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
