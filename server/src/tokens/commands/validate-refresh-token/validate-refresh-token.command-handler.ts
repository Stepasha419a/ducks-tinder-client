import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateRefreshTokenCommand } from './validate-refresh-token.command';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@CommandHandler(ValidateRefreshTokenCommand)
export class ValidateRefreshTokenCommandHandler
  implements ICommandHandler<ValidateRefreshTokenCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: ValidateRefreshTokenCommand) {
    const { token } = command;

    try {
      const existingRefreshToken = await this.prismaService.token.findUnique({
        where: { refreshToken: token },
      });
      if (!existingRefreshToken) {
        throw new UnauthorizedException();
      }

      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
}
