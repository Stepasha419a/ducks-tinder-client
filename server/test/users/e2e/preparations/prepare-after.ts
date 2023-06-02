import prismaClient from 'test/prisma-client';

export async function prepareAfter(currentUserId, secondUserId) {
  await prismaClient.$transaction([
    prismaClient.picture.deleteMany({
      where: { user: { id: { in: [currentUserId, secondUserId] } } },
    }),
    prismaClient.checkedUsers.deleteMany({
      where: {
        OR: [{ checkedId: currentUserId }, { checkedId: secondUserId }],
      },
    }),
    prismaClient.user.deleteMany({
      where: { id: { in: [currentUserId, secondUserId] } },
    }),
  ]);
}
