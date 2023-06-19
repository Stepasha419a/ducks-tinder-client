import { authUserStub } from 'auth/test/stubs';
import prismaClient from 'prisma/test/prisma-client/prisma-client';
import { userDtoStub } from 'users/test/stubs';

export async function prepareBefore() {
  await prismaClient.user.create({
    data: {
      id: authUserStub().id,
      email: authUserStub().email,
      name: userDtoStub().name,
      // password which is equal for bcrypt compare
      password: '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
    },
  });
}
