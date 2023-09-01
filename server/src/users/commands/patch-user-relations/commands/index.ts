export { PatchZodiacSignCommand } from './patch-zodiac-sign';
export { PatchAttentionSignCommand } from './patch-attention-sign';
export { PatchInterestsCommand } from './patch-interests';
export { PatchChildrenAttitudeCommand } from './patch-children-attitude';
export { PatchCommunicationStyleCommand } from './patch-communication-style';
export { PatchEducationCommand } from './patch-education';
export { PatchPersonalityTypeCommand } from './patch-personality-type';
export { PatchAlcoholAttitudeCommand } from './patch-alcohol-attitude';
export { PatchChronotypeCommand } from './patch-chronotype';
export { PatchFoodPreferenceCommand } from './patch-food-preference';
export { PatchPetCommand } from './patch-pet';
export { PatchSmokingAttitudeCommand } from './patch-smoking-attitude';
export { PatchSocialNetworksActivityCommand } from './patch-social-networks-activity';
export { PatchTrainingAttitudeCommand } from './patch-training-attitude';

import { PatchZodiacSignCommandHandler } from './patch-zodiac-sign';
import { PatchAttentionSignCommandHandler } from './patch-attention-sign';
import { PatchInterestsCommandHandler } from './patch-interests';
import { PatchChildrenAttitudeCommandHandler } from './patch-children-attitude';
import { PatchCommunicationStyleCommandHandler } from './patch-communication-style';
import { PatchEducationCommandHandler } from './patch-education';
import { PatchPersonalityTypeCommandHandler } from './patch-personality-type';
import { PatchAlcoholAttitudeCommandHandler } from './patch-alcohol-attitude';
import { PatchChronotypeCommandHandler } from './patch-chronotype';
import { PatchFoodPreferenceCommandHandler } from './patch-food-preference';
import { PatchPetCommandHandler } from './patch-pet';
import { PatchSmokingAttitudeCommandHandler } from './patch-smoking-attitude';
import { PatchSocialNetworksActivityCommandHandler } from './patch-social-networks-activity';
import { PatchTrainingAttitudeCommandHandler } from './patch-training-attitude';

export const PatchUserRelationCommandHandlers = [
  PatchZodiacSignCommandHandler,
  PatchAttentionSignCommandHandler,
  PatchInterestsCommandHandler,
  PatchChildrenAttitudeCommandHandler,
  PatchCommunicationStyleCommandHandler,
  PatchEducationCommandHandler,
  PatchPersonalityTypeCommandHandler,
  PatchAlcoholAttitudeCommandHandler,
  PatchChronotypeCommandHandler,
  PatchFoodPreferenceCommandHandler,
  PatchPetCommandHandler,
  PatchSmokingAttitudeCommandHandler,
  PatchSocialNetworksActivityCommandHandler,
  PatchTrainingAttitudeCommandHandler,
];
