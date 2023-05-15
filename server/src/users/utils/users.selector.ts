export class UsersSelector {
  private static selectPictures(take?: number) {
    return {
      pictures: {
        take: take || undefined,
        select: { name: true, order: true },
      },
    };
  }

  private static selectInterests() {
    return {
      userToInterests: { select: { interest: { select: { name: true } } } },
    };
  }

  private static selectFirstPairPicture() {
    return {
      pairFor: {
        take: 1,
        select: { userPair: { select: this.selectPictures(1) } },
      },
    };
  }

  static selectUser() {
    return {
      _count: { select: { pairFor: true } },
      ...this.selectInterests(),
      ...this.selectPictures(),
      ...this.selectFirstPairPicture(),
    };
  }

  static selectShortUser() {
    return {
      id: true,
      name: true,
      age: true,
      description: true,
      distance: true,
      ...this.selectInterests(),
      ...this.selectPictures(),
    };
  }
}
