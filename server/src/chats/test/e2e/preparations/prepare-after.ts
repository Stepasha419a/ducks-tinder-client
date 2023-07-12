import prismaClient from 'prisma/test/prisma-client';

export async function prepareAfter(currentUserId, secondUserId) {
  await prismaClient.$transaction([
    prismaClient.message.deleteMany({
      where: { userId: { in: [currentUserId, secondUserId] } },
    }),
    prismaClient.chat.deleteMany({
      where: {
        users: { some: { id: { in: [currentUserId, secondUserId] } } },
      },
    }),
    prismaClient.place.deleteMany({
      where: { id: { in: [currentUserId, secondUserId] } },
    }),
    prismaClient.user.deleteMany({
      where: { id: { in: [currentUserId, secondUserId] } },
    }),
  ]);
}
