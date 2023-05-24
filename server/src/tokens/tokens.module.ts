import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokensService],
  imports: [PrismaModule, JwtModule.register({})],
  exports: [TokensService],
})
export class TokensModule {}
