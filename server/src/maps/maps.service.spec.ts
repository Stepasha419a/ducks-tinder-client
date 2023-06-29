import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [MapsService],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
