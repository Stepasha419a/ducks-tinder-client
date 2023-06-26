import * as bcrypt from 'bcryptjs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthDataReturn } from 'auth/auth.interface';
import { UsersService } from 'users/users.service';
import { TokensService } from 'tokens/tokens.service';
import { ForbiddenException } from '@nestjs/common';
import { UserDto } from 'users/dto';
import { UserTokenDto } from 'auth/dto';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async execute(command: LoginCommand): Promise<AuthDataReturn> {
    const { dto } = command;

    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }

    const isPassEquals = await bcrypt.compare(dto.password, user.password);
    if (!isPassEquals) {
      throw new ForbiddenException('Incorrect email or password');
    }

    const userDto = new UserDto(user);
    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });
    const tokens = await this.tokensService.generateTokens({ ...userTokenDto });

    return {
      data: { user: userDto, accessToken: tokens.accessToken },
      refreshToken: tokens.refreshToken,
    };
  }
}
