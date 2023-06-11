import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokensCommand } from './generate-tokens.command';

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler
  implements ICommandHandler<GenerateTokensCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: GenerateTokensCommand) {
    const { payload } = command;

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    await this.saveRefreshToken(payload.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenData = await this.prismaService.token.findUnique({
      where: { id: userId },
    });
    if (tokenData) {
      return this.prismaService.token.update({
        where: { id: tokenData.id },
        data: { refreshToken },
      });
    }
    return this.prismaService.token.create({
      data: { id: userId, refreshToken },
    });
  }
}
