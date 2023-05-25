import { UsersSelector } from 'users/utils';
import prismaClient from 'test/prisma-client';
import { UserDto } from 'users/dto';

export async function prepareBefore() {
  await prismaClient.$transaction([
    prismaClient.user.createMany({
      data: [
        { email: '123@gmail.com', password: '123123', name: 'Jason' },
        {
          email: '456@gmail.com',
          password: '456456',
          name: 'Loren',
          age: 20,
          distance: 50,
          preferAgeFrom: 18,
          preferAgeTo: 28,
          preferSex: 'male',
          sex: 'female',
        },
      ],
    }),
    prismaClient.user.update({
      where: { email: '456@gmail.com' },
      data: {
        pictures: {
          createMany: {
            data: [
              { name: 'picture-name', order: 0 },
              { name: 'picture-name', order: 1 },
              { name: 'picture-name', order: 2 },
              { name: 'picture-name', order: 3 },
              { name: 'picture-name', order: 4 },
              { name: 'picture-name', order: 5 },
              { name: 'picture-name', order: 6 },
              { name: 'picture-name', order: 7 },
              { name: 'picture-name', order: 8 },
            ],
          },
        },
      },
      include: UsersSelector.selectUser(),
    }),
    prismaClient.interest.createMany({
      data: [{ name: 'traveling' }, { name: 'ski' }],
    }),
  ]);

  const users = (
    await prismaClient.user.findMany({
      include: UsersSelector.selectUser(),
    })
  ).map((user) => new UserDto(user));

  const currentUser = users[0];

  return { users, currentUser };
}
