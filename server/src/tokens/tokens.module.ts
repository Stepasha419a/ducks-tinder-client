import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TokensService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    PrismaModule,
  ],
  exports: [TokensService],
})
export class TokensModule {}
