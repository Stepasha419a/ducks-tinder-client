export class UsersSelector {
  static selectUser() {
    return {
      _count: { select: { pairFor: true } },
      interests: { select: { name: true } },
      pictures: {
        select: { name: true, order: true },
        orderBy: { order: 'asc' as 'asc' | 'desc' },
      },
      pairs: {
        where: { pictures: { some: { order: 0 } } },
        take: 1,
        select: {
          id: true,
          pictures: {
            take: 1,
            select: { name: true, order: true },
            orderBy: { order: 'asc' as 'asc' | 'desc' },
          },
        },
      },
    };
  }

  static selectShortUser() {
    return {
      id: true,
      name: true,
      age: true,
      description: true,
      distance: true,
      place: true,
      isActivated: true,
      interests: { select: { name: true } },
      pictures: {
        select: { name: true, order: true },
        orderBy: { order: 'asc' as 'asc' | 'desc' },
      },
    };
  }
}
