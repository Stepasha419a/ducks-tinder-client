import { CqrsModule } from '@nestjs/cqrs';
import { TokensModule } from 'tokens/tokens.module';
import { UsersModule } from 'users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthCommandHandlers } from './commands';

@Module({
  providers: [...AuthCommandHandlers],
  controllers: [AuthController],
  imports: [CqrsModule, UsersModule, TokensModule],
})
export class AuthModule {}
