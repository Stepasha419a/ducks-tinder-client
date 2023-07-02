import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_USER } from 'common/constants/error';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetUserQuery): Promise<UserDto> {
    const { id } = query;

    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id } } },
    });

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: UsersSelector.selectUser(),
    });

    if (!user) {
      throw new NotFoundException(NOT_FOUND_USER);
    }

    return new UserDto({ ...user, pairsCount });
  }
}
