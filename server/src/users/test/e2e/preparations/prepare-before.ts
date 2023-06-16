import { UsersSelector } from 'users/users.selector';
import prismaClient from 'prisma/test/prisma-client';
import { UserDto } from 'users/dto';

export async function prepareBefore(currentUserId, secondUserId) {
  await prismaClient.$transaction([
    prismaClient.user.createMany({
      data: [
        {
          id: currentUserId,
          email: `${currentUserId}@gmail.com`,
          password: '123123',
          name: 'Jason',
        },
        {
          id: secondUserId,
          email: `${secondUserId}@gmail.com`,
          password: '456456',
          name: 'Loren',
        },
      ],
    }),
  ]);

  const currentUser = new UserDto(
    await prismaClient.user.findUnique({
      where: { id: currentUserId },
      include: UsersSelector.selectUser(),
    }),
  );
  const secondUser = new UserDto(
    await prismaClient.user.findUnique({
      where: { id: secondUserId },
      include: UsersSelector.selectUser(),
    }),
  );
  return { currentUser, secondUser };
}
