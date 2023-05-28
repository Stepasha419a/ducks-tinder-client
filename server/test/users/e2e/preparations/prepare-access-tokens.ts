import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();
const configService = new ConfigService();

export function prepareAccessTokens() {
  const currentUserAccessToken = jwtService.sign(
    {
      id: 'current-user-id',
      email: '123@gmail.com',
    },
    {
      expiresIn: '15m',
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
    },
  );

  const secondUserAccessToken = jwtService.sign(
    {
      id: 'second-user-id',
      email: '456@gmail.com',
    },
    {
      expiresIn: '15m',
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
    },
  );

  const wrongUserAccessToken = jwtService.sign(
    {
      id: 'wrong-user-id',
      email: 'wrong@gmail.com',
    },
    {
      expiresIn: '15m',
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
    },
  );

  return {
    currentUserAccessToken,
    secondUserAccessToken,
    wrongUserAccessToken,
  };
}
