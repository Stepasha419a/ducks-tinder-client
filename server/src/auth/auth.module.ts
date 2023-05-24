import { MailModule } from 'mail/mail.module';
import { TokensModule } from 'tokens/tokens.module';
import { UsersModule } from 'users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TokensModule, MailModule],
})
export class AuthModule {}
