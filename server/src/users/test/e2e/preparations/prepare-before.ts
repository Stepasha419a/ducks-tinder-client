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
    prismaClient.place.createMany({
      data: [
        {
          id: currentUserId,
          latitude: 12.3456789,
          longitude: 12.3456789,
          name: 'current-user-place-name',
          address: 'current-user-place-address',
        },
        {
          id: secondUserId,
          latitude: 12.5456789,
          longitude: 12.5456789,
          name: 'second-user-place-name',
          address: 'second-user-place-address',
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
