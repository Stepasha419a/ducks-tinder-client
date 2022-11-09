import {MongooseModule} from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatModule } from './chat/chat.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }), 
    MongooseModule.forRoot("mongodb://localhost/ducks-db"),
    UsersModule, 
    FilesModule, 
    AuthModule, 
    TokensModule,
    MailModule,
    ChatModule,
    ConfigModule.forRoot()
  ]
})
export class AppModule {}