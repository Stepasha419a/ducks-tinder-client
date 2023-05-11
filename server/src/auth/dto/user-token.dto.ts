export class UserTokenDto {
  id;
  email;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
  }
}
