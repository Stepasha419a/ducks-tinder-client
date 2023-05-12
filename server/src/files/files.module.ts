import { FilesService } from './files.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
