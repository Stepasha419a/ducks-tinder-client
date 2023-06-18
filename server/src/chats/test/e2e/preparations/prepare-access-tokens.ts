import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();
const configService = new ConfigService();

export function prepareAccessTokens(currentUserId) {
  const currentUserAccessToken = jwtService.sign(
    {
      id: currentUserId,
      email: `${currentUserId}@gmail.com`,
    },
    {
      expiresIn: '15m',
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
    },
  );

  return {
    currentUserAccessToken,
  };
}
