import { FilesModule } from './../files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.model';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FilesModule,
    TokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
