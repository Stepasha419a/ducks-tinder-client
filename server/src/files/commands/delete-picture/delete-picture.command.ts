export class DeletePictureCommand {
  constructor(
    public readonly fileName: string,
    public readonly userId: string,
  ) {}
}
