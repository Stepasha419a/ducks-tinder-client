import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    getOne: jest.fn((id) => ({
      id: id,
      name: 'Stepan',
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
  };

  const mockAuthGuard = jest.fn(() => true);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = await moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user', () => {
    expect(controller.getOne('6307cdaa59a37a92b2d7ead4')).toEqual({
      id: '6307cdaa59a37a92b2d7ead4',
      name: 'Stepan',
    });
  });

  it('should update a user', () => {
    expect(
      controller.update({ name: 'John' }, '6307cdaa59a37a92b2d7ead4'),
    ).toEqual({
      id: '6307cdaa59a37a92b2d7ead4',
      name: 'John',
    });
  });
});
