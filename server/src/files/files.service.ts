import * as uuid from 'uuid';
import * as path from 'path';
import {
  unlinkSync,
  mkdirSync,
  rmSync,
  readdirSync,
  renameSync,
  writeFile,
} from 'fs';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ensureDir } from 'fs-extra';

@Injectable()
export class FilesService {
  makeUserDir(userId: string) {
    try {
      mkdirSync(path.resolve(__dirname, '..', '..', 'static', userId), {
        recursive: true,
      });
      mkdirSync(
        path.resolve(__dirname, '..', '..', 'static', userId, 'avatar'),
      );
      mkdirSync(
        path.resolve(__dirname, '..', '..', 'static', userId, 'gallery'),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  deleteUserDir(userId: string) {
    try {
      rmSync(path.resolve(__dirname, '..', '..', 'static', userId), {
        recursive: true,
        force: true,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async savePicture(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const folderPath = path.resolve(
        __dirname,
        '..',
        '..',
        `static\\${userId}`,
      );
      await ensureDir(folderPath);

      writeFile(`${folderPath}/${fileName}`, file.buffer, () => null);

      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  deletePicture(fileName: string, userId: string): string {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        `static\\${userId}`,
        fileName,
      );

      unlinkSync(filePath);

      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  changePicturesDir(userId: string, newAvatarImageName: string) {
    try {
      const newGalleryImageName = readdirSync(
        path.resolve(__dirname, '..', '..', `static\\${userId}\\avatar\\`),
      )[0];

      const storageName = path.resolve(
        __dirname,
        '..',
        '..',
        `static\\${userId}\\`,
      );

      renameSync(
        `${storageName}\\avatar\\${newGalleryImageName}`,
        `${storageName}\\gallery\\${newGalleryImageName}`,
      );
      renameSync(
        `${storageName}\\gallery\\${newAvatarImageName}`,
        `${storageName}\\avatar\\${newAvatarImageName}`,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
