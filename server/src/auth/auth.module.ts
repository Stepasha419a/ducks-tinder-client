import { MailModule } from './../mail/mail.module';
import { TokensModule } from './../tokens/tokens.module';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    TokensModule,
    FilesModule,
    MailModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: "7d"
      }
    })
  ],
  exports: [JwtModule]
})
export class AuthModule {}
