export class DeletePictureDto {
  readonly userId: string;
  readonly pictureName: string;
  readonly setting: 'avatar' | 'gallery';
}
