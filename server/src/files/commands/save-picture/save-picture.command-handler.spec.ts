import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import { Test } from '@nestjs/testing';
import { SavePictureCommand } from './save-picture.command';
import { SavePictureCommandHandler } from './save-picture.command-handler';

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;
jest.mock('path');
const mockedPath = path as jest.Mocked<typeof path>;
jest.mock('uuid');
const mockedUuid = uuid as jest.Mocked<typeof uuid>;
jest.mock('fs-extra');
const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;

describe('when save picture is called', () => {
  let savePictureCommandHandler: SavePictureCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SavePictureCommandHandler],
    }).compile();

    savePictureCommandHandler = moduleRef.get<SavePictureCommandHandler>(
      SavePictureCommandHandler,
    );
  });

  const userId = 'save-picture-user-id';
  const fileName = 'file-name.jpg';
  const folderPath = 'folder-path';
  const file = {
    fieldname: 'picture-file',
    buffer: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
  } as Express.Multer.File;

  describe('when it is called correctly', () => {
    beforeAll(() => {
      (mockedUuid.v4 as jest.Mock).mockReturnValue('file-name');
      (mockedPath.resolve as jest.Mock).mockReturnValue(folderPath);
    });

    let response: string;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await savePictureCommandHandler.execute(
        new SavePictureCommand(file, userId),
      );
    });

    it('should call uuid v4', () => {
      expect(mockedUuid.v4).toBeCalledTimes(1);
    });

    it('should call path resolve', () => {
      expect(mockedPath.resolve).toBeCalledTimes(1);
      expect(mockedPath.resolve).toBeCalledWith(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        `static\\${userId}`,
      );
    });

    it('should call fs-extra ensureDir', () => {
      expect(mockedFsExtra.ensureDir).toBeCalledTimes(1);
      expect(mockedFsExtra.ensureDir).toBeCalledWith(folderPath);
    });

    it('should call fs writeFile', () => {
      expect(mockedFs.writeFile).toBeCalledTimes(1);
      expect(mockedFs.writeFile).toBeCalledWith(
        `${folderPath}/${fileName}`,
        file.buffer,
        expect.any(Function),
      );
    });

    it('should return fileName', () => {
      expect(response).toBeDefined();
      expect(response.slice(-4)).toEqual('.jpg');
    });
  });
});
