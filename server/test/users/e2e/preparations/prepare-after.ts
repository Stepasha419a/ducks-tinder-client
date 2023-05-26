import prismaClient from 'test/prisma-client';

export async function prepareAfter() {
  await prismaClient.$transaction([
    prismaClient.picture.deleteMany({
      where: { user: { id: { in: ['current-user-id', 'second-user-id'] } } },
    }),
    prismaClient.user.deleteMany({
      where: { id: { in: ['current-user-id', 'second-user-id'] } },
    }),
    prismaClient.interest.deleteMany({
      where: {
        id: { in: ['interest-id-1', 'interest-id-2'] },
      },
    }),
  ]);
}
