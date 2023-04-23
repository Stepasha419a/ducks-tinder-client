export class SavePictureDto {
  readonly userId: string;
  readonly setting: 'avatar' | 'gallery';
}
