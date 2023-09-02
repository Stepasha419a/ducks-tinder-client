import { PrismaService } from 'prisma/prisma.service';
import { PatchUserRelationsCommandHandler } from './patch-user-relations.command-handler';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { CommandBusMock, UsersPrismaMock } from 'users/test/mocks';
import { PatchUserRelationsDto, UserDto } from 'users/dto';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { PatchUserRelationsCommand } from './patch-user-relations.command';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import {
  PatchAlcoholAttitudeCommand,
  PatchAttentionSignCommand,
  PatchChildrenAttitudeCommand,
  PatchChronotypeCommand,
  PatchCommunicationStyleCommand,
  PatchEducationCommand,
  PatchFoodPreferenceCommand,
  PatchInterestsCommand,
  PatchPersonalityTypeCommand,
  PatchPetCommand,
  PatchSmokingAttitudeCommand,
  PatchSocialNetworksActivityCommand,
  PatchTrainingAttitudeCommand,
  PatchZodiacSignCommand,
} from './commands';
import { UsersSelector } from 'users/users.selector';

describe('when patch user relations is called', () => {
  let prismaService: PrismaService;
  let commandBus: CommandBus;
  let patchUserRelationsCommandHandler: PatchUserRelationsCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchUserRelationsCommandHandler],
      imports: [PrismaModule, CqrsModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    patchUserRelationsCommandHandler =
      moduleRef.get<PatchUserRelationsCommandHandler>(
        PatchUserRelationsCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
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
      alcoholAttitude: 'alcohol-attitude',
      chronotype: 'chronotype',
      foodPreference: 'food-preference',
      pet: 'pet',
      smokingAttitude: 'smoking-attitude',
      socialNetworksActivity: 'social-networks-activity',
      trainingAttitude: 'training-attitude',
    };

    beforeEach(async () => {
      response = await patchUserRelationsCommandHandler.execute(
        new PatchUserRelationsCommand(requestUserStub(), dto),
      );
    });

    it('should call command bus to call commands', () => {
      expect(commandBus.execute).toBeCalledTimes(14);
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        1,
        new PatchInterestsCommand(requestUserStub(), dto.interests),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        2,
        new PatchAttentionSignCommand(requestUserStub(), dto.attentionSign),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        3,
        new PatchChildrenAttitudeCommand(
          requestUserStub(),
          dto.childrenAttitude,
        ),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        4,
        new PatchCommunicationStyleCommand(
          requestUserStub(),
          dto.communicationStyle,
        ),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        5,
        new PatchEducationCommand(requestUserStub(), dto.education),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        6,
        new PatchPersonalityTypeCommand(requestUserStub(), dto.personalityType),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        7,
        new PatchZodiacSignCommand(requestUserStub(), dto.zodiacSign),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        8,
        new PatchAlcoholAttitudeCommand(requestUserStub(), dto.alcoholAttitude),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        9,
        new PatchChronotypeCommand(requestUserStub(), dto.chronotype),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        10,
        new PatchFoodPreferenceCommand(requestUserStub(), dto.foodPreference),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        11,
        new PatchPetCommand(requestUserStub(), dto.pet),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        12,
        new PatchSmokingAttitudeCommand(requestUserStub(), dto.smokingAttitude),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        13,
        new PatchSocialNetworksActivityCommand(
          requestUserStub(),
          dto.socialNetworksActivity,
        ),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        14,
        new PatchTrainingAttitudeCommand(
          requestUserStub(),
          dto.trainingAttitude,
        ),
      );
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

  describe('when it is called with some empty and null fields', () => {
    beforeAll(() => {
      prismaService.user.count = jest.fn().mockResolvedValue(5);
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
    });

    let response: UserDto;
    const dto: PatchUserRelationsDto = {
      childrenAttitude: null,
      education: 'education',
      interests: [],
      personalityType: null,
      alcoholAttitude: 'alcohol-attitude',
      chronotype: null,
      pet: 'pet',
      smokingAttitude: null,
      socialNetworksActivity: 'social-networks-activity',
    };

    beforeEach(async () => {
      response = await patchUserRelationsCommandHandler.execute(
        new PatchUserRelationsCommand(requestUserStub(), dto),
      );
    });

    it('should call command bus to call commands', () => {
      expect(commandBus.execute).toBeCalledTimes(9);
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        1,
        new PatchInterestsCommand(requestUserStub(), dto.interests),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        2,
        new PatchChildrenAttitudeCommand(
          requestUserStub(),
          dto.childrenAttitude,
        ),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        3,
        new PatchEducationCommand(requestUserStub(), dto.education),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        4,
        new PatchPersonalityTypeCommand(requestUserStub(), dto.personalityType),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        5,
        new PatchAlcoholAttitudeCommand(requestUserStub(), dto.alcoholAttitude),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        6,
        new PatchChronotypeCommand(requestUserStub(), dto.chronotype),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        7,
        new PatchPetCommand(requestUserStub(), dto.pet),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        8,
        new PatchSmokingAttitudeCommand(requestUserStub(), dto.smokingAttitude),
      );
      expect(commandBus.execute).toHaveBeenNthCalledWith(
        9,
        new PatchSocialNetworksActivityCommand(
          requestUserStub(),
          dto.socialNetworksActivity,
        ),
      );
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
});
