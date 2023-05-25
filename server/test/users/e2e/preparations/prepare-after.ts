import prismaClient from 'test/prisma-client';

export async function prepareAfter() {
  await prismaClient.$transaction([
    prismaClient.picture.deleteMany(),
    prismaClient.user.deleteMany(),
    prismaClient.interest.deleteMany(),
  ]);
}
