import { CqrsModule } from '@nestjs/cqrs';
import { MailModule } from 'mail/mail.module';
import { TokensModule } from 'tokens/tokens.module';
import { UsersModule } from 'users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCommandHandlers } from './commands';

@Module({
  providers: [AuthService, ...AuthCommandHandlers],
  controllers: [AuthController],
  imports: [CqrsModule, UsersModule, TokensModule, MailModule],
})
export class AuthModule {}
