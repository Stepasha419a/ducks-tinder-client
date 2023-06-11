import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenHandlers } from './commands';

@Module({
  providers: [TokensService, ...TokenHandlers],
  imports: [PrismaModule, CqrsModule, JwtModule.register({})],
  exports: [TokensService],
})
export class TokensModule {}
