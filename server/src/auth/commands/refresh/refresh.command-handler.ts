import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';
import { UserTokenDto } from 'auth/dto';
import { AuthDataReturn } from 'auth/auth.interface';
import { RefreshCommand } from './refresh.command';

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async execute(command: RefreshCommand): Promise<AuthDataReturn> {
    const { refreshToken } = command;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = await this.tokensService.validateRefreshToken(
      refreshToken,
    );
    if (!userData) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(userData.id);
    const userTokenDto = new UserTokenDto({
      id: user.id,
      email: user.email,
    });
    const tokens = await this.tokensService.generateTokens({ ...userTokenDto });
    return {
      data: { user, accessToken: tokens.accessToken },
      refreshToken: tokens.refreshToken,
    };
  }
}
