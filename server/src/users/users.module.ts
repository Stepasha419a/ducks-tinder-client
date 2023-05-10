import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { TokensModule } from '../tokens/tokens.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule, FilesModule, TokensModule],
  exports: [UsersService],
})
export class UsersModule {}
