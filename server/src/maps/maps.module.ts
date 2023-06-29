import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MapsService } from './maps.service';
import { PrismaModule } from 'prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { mapQueryHandlers } from './queries';

@Module({
  providers: [MapsService, ...mapQueryHandlers],
  imports: [PrismaModule, CqrsModule, HttpModule],
  exports: [MapsService],
})
export class MapsModule {}
