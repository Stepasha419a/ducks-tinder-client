import { Test } from '@nestjs/testing';
import { FilesService } from './files.service';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { DeletePictureCommand, SavePictureCommand } from './commands';

describe('files-service', () => {
  let service: FilesService;
  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FilesService],
      imports: [CqrsModule],
    }).compile();

    service = moduleRef.get<FilesService>(FilesService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when save picture is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue('file-name');
    });

    let fileName;

    const userId = 'save-picture-user-id';
    const file = {
      fieldname: 'picture-file',
      buffer: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
    } as Express.Multer.File;

    beforeEach(async () => {
      fileName = await service.savePicture(file, userId);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new SavePictureCommand(file, userId),
      );
    });

    it('should return fileName', () => {
      expect(fileName).toEqual('file-name');
    });
  });

  describe('when delete picture is called', () => {
    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue('file-name');
    });

    let fileName;

    const userId = 'save-picture-user-id';

    beforeEach(async () => {
      fileName = await service.deletePicture('file-name', userId);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new DeletePictureCommand('file-name', userId),
      );
    });

    it('should return fileName', () => {
      expect(fileName).toEqual('file-name');
    });
  });
});
