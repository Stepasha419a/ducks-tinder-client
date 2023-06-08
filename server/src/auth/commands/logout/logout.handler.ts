import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokensService } from 'tokens/tokens.service';
import { LogoutCommand } from './logout.command';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private readonly tokensService: TokensService) {}

  async execute(command: LogoutCommand): Promise<void> {
    const { refreshToken } = command;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    await this.tokensService.removeToken(refreshToken);
  }
}
