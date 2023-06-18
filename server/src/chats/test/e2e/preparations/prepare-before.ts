import prismaClient from 'prisma/test/prisma-client';

export async function prepareBefore(currentUserId, secondUserId, chatId) {
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
    prismaClient.chat.create({
      data: {
        id: chatId,
        users: { connect: [{ id: currentUserId }, { id: secondUserId }] },
      },
    }),
  ]);
}
