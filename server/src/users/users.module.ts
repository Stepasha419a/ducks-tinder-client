import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersCommandHandlers } from './commands';

@Module({
  providers: [UsersService, ...UsersCommandHandlers],
  controllers: [UsersController],
  imports: [PrismaModule, CqrsModule, FilesModule],
  exports: [UsersService],
})
export class UsersModule {}
