import { CqrsModule } from '@nestjs/cqrs';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';
import { FileCommandHandlers } from './commands';

@Module({
  providers: [FilesService, ...FileCommandHandlers],
  imports: [CqrsModule],
  exports: [FilesService],
})
export class FilesModule {}
