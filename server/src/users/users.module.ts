import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PatchUserHandler } from './commands/patch-user/patch-user.handler';

@Module({
  providers: [UsersService, PatchUserHandler],
  controllers: [UsersController],
  imports: [PrismaModule, CqrsModule, FilesModule],
  exports: [UsersService],
})
export class UsersModule {}
