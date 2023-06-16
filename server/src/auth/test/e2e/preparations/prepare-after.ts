import { authUserStub } from 'auth/test/stubs';
import prismaClient from 'prisma/test/prisma-client/prisma-client';

export async function prepareAfter() {
  await prismaClient.$transaction([
    prismaClient.token.deleteMany({
      where: {
        user: { email: { in: [authUserStub().email, '789@gmail.com'] } },
      },
    }),
    prismaClient.user.deleteMany({
      where: { email: { in: [authUserStub().email, '789@gmail.com'] } },
    }),
  ]);
}
