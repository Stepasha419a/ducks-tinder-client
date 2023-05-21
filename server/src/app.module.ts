import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatsModule } from './chats/chats.module';
import { PrismaModule } from './prisma/prisma.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(path.resolve(__dirname, '..', 'static')),
    }),
    PrismaModule,
    UsersModule,
    FilesModule,
    AuthModule,
    TokensModule,
    MailModule,
    ChatsModule,
  ],
})
export class AppModule {}
