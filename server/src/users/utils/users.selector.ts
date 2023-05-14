export class UsersSelector {
  static selectUser() {
    return {
      pictures: { select: { name: true, order: true } },
      userToInterests: { select: { interest: { select: { name: true } } } },
    };
  }

  static selectShortUser() {
    return {
      id: true,
      name: true,
      age: true,
      description: true,
      distance: true,
      ...this.selectUser(),
    };
  }
}
