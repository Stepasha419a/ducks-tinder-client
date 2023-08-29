import { PrismaService } from 'prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { MapsModule } from 'maps/maps.module';
import { UsersPrismaMock } from 'users/test/mocks';
import { PatchUserRelationsDto, UserDto } from 'users/dto';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { ConfigModule } from '@nestjs/config';
import { PatchUserRelationsHandlerCommand } from './patch-user-relations.command-handler';
import { PatchUserRelationsCommand } from './patch-user-relations.command';
import { UsersSelector } from 'users/users.selector';

describe('when patch user relations is called', () => {
  let patchUserRelationsHandlerCommand: PatchUserRelationsHandlerCommand;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchUserRelationsHandlerCommand],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        PrismaModule,
        MapsModule,
      ],
    })
      .overrideProvider(PrismaModule)
      .useValue(UsersPrismaMock())
      .compile();

    patchUserRelationsHandlerCommand =
      moduleRef.get<PatchUserRelationsHandlerCommand>(
        PatchUserRelationsHandlerCommand,
      );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      response = await patchUserRelationsHandlerCommand.execute(
        new PatchUserRelationsCommand(requestUserStub(), dto),
      );
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: dto.communicationStyle },
      });
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should call personality type find unique', () => {
      expect(prismaService.personalityType.findUnique).toBeCalledTimes(1);
      expect(prismaService.personalityType.findUnique).toBeCalledWith({
        where: { name: dto.personalityType },
      });
    });

    it('should call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.zodiacSign.findUnique).toBeCalledWith({
        where: { name: dto.zodiacSign },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(12);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          childrenAttitude: { connect: { name: 'children-attitude' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(5, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(6, {
        data: {
          communicationStyle: { connect: { name: 'communication-style' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(7, {
        where: { id: requestUserStub().id },
        data: {
          education: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(8, {
        data: {
          education: { connect: { name: 'education' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(9, {
        where: { id: requestUserStub().id },
        data: {
          personalityType: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(10, {
        data: {
          personalityType: { connect: { name: 'personality-type' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(11, {
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(12, {
        data: {
          zodiacSign: { connect: { name: 'zodiac-sign' } },
        },
        where: { id: requestUserStub().id },
      });
    });

    it('should call user count', () => {
      expect(prismaService.user.count).toBeCalledTimes(1);
      expect(prismaService.user.count).toBeCalledWith({
        where: { pairFor: { some: { id: requestUserStub().id } } },
      });
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: requestUserStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should return user', () => {
      expect(response).toEqual(userDtoStub());
    });
  });

  describe('when there is no such attention-sign', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should not call other relations find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).not.toBeCalled();
      expect(prismaService.communicationStyle.findUnique).not.toBeCalled();
      expect(prismaService.education.findUnique).not.toBeCalled();
      expect(prismaService.personalityType.findUnique).not.toBeCalled();
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
      expect(prismaService.childrenAttitude.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such children-attitude', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should not call other relations find unique', () => {
      expect(prismaService.communicationStyle.findUnique).not.toBeCalled();
      expect(prismaService.education.findUnique).not.toBeCalled();
      expect(prismaService.personalityType.findUnique).not.toBeCalled();
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(3);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such communication-style', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: dto.communicationStyle },
      });
    });

    it('should not call other relations find unique', () => {
      expect(prismaService.education.findUnique).not.toBeCalled();
      expect(prismaService.personalityType.findUnique).not.toBeCalled();
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(5);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          childrenAttitude: { connect: { name: 'children-attitude' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(5, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: {
            disconnect: true,
          },
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such education', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: dto.communicationStyle },
      });
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should not call other relations find unique', () => {
      expect(prismaService.personalityType.findUnique).not.toBeCalled();
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(7);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          childrenAttitude: { connect: { name: 'children-attitude' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(5, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(6, {
        data: {
          communicationStyle: { connect: { name: 'communication-style' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(7, {
        where: { id: requestUserStub().id },
        data: {
          education: {
            disconnect: true,
          },
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such personality-type', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'zodiac-sign' });

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: dto.communicationStyle },
      });
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should call personality type find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should not call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(9);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          childrenAttitude: { connect: { name: 'children-attitude' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(5, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(6, {
        data: {
          communicationStyle: { connect: { name: 'communication-style' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(7, {
        where: { id: requestUserStub().id },
        data: {
          education: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(8, {
        data: {
          education: { connect: { name: 'education' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(9, {
        where: { id: requestUserStub().id },
        data: {
          personalityType: {
            disconnect: true,
          },
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such zodiac-sign', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'attention-sign' });
      prismaService.childrenAttitude.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'children-attitude' });
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'communication-style' });
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'education' });
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue({ name: 'personality-type' });
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);

      prismaService.user.update = jest.fn();
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    let error;
    const dto: PatchUserRelationsDto = {
      attentionSign: 'attention-sign',
      childrenAttitude: 'children-attitude',
      communicationStyle: 'communication-style',
      education: 'education',
      interests: ['interest-1', 'interest-2', 'wrong-interest'],
      personalityType: 'personality-type',
      zodiacSign: 'zodiac-sign',
    };

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce(['disconnect-interest-id'])
        .mockResolvedValueOnce(['interest-id-1', 'interest-id-2']);

      try {
        response = await patchUserRelationsHandlerCommand.execute(
          new PatchUserRelationsCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    // only check interests because prisma transaction is not spying
    it('should call interests find many', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto.interests } },
        select: { id: true },
      });
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: dto.attentionSign },
      });
    });

    it('should call children attitude find unique', () => {
      expect(prismaService.childrenAttitude.findUnique).toBeCalledTimes(1);
      expect(prismaService.childrenAttitude.findUnique).toBeCalledWith({
        where: { name: dto.childrenAttitude },
      });
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: dto.communicationStyle },
      });
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should call personality type find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: dto.education },
      });
    });

    it('should call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.zodiacSign.findUnique).toBeCalledWith({
        where: { name: dto.zodiacSign },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(11);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        data: {
          attentionSign: {
            disconnect: true,
          },
        },
        where: {
          id: requestUserStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: { attentionSign: { connect: { name: 'attention-sign' } } },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        data: {
          childrenAttitude: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          childrenAttitude: { connect: { name: 'children-attitude' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(5, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(6, {
        data: {
          communicationStyle: { connect: { name: 'communication-style' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(7, {
        where: { id: requestUserStub().id },
        data: {
          education: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(8, {
        data: {
          education: { connect: { name: 'education' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(9, {
        where: { id: requestUserStub().id },
        data: {
          personalityType: {
            disconnect: true,
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(10, {
        data: {
          personalityType: { connect: { name: 'personality-type' } },
        },
        where: { id: requestUserStub().id },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(11, {
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: {
            disconnect: true,
          },
        },
      });
    });

    it('should not call user count', () => {
      expect(prismaService.user.count).not.toBeCalled();
    });

    it('should not call user find unique', () => {
      expect(prismaService.user.findUnique).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
