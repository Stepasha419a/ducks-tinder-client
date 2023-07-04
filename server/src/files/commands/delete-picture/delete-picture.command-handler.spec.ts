import * as path from 'path';
import * as fs from 'fs';
import { Test } from '@nestjs/testing';
import { DeletePictureCommandHandler } from './delete-picture.command-handler';
import { DeletePictureCommand } from './delete-picture.command';

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;
jest.mock('path');
const mockedPath = path as jest.Mocked<typeof path>;

describe('when delete picture is called', () => {
  let deletePictureCommandHandler: DeletePictureCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeletePictureCommandHandler],
    }).compile();

    deletePictureCommandHandler = moduleRef.get<DeletePictureCommandHandler>(
      DeletePictureCommandHandler,
    );
  });

  const userId = 'delete-picture-user-id';
  const fileName = 'picture-name-1.jpg';

  describe('when it is called correctly', () => {
    beforeAll(() => {
      (mockedPath.resolve as jest.Mock).mockReturnValue('file-path');
    });

    let response: string;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await deletePictureCommandHandler.execute(
        new DeletePictureCommand(fileName, userId),
      );
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
        fileName,
      );
    });

    it('should call fs unlinkSync', () => {
      expect(mockedFs.unlinkSync).toBeCalledTimes(1);
      expect(mockedFs.unlinkSync).toBeCalledWith('file-path');
    });

    it('should return fileName', () => {
      expect(response).toEqual(fileName);
    });
  });
});
