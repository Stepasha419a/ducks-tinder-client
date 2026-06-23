import { shortUserStub } from '@ducks-tinder-client/auth';
import type { ShortUser } from '@ducks-tinder-client/common';
import {
  AttentionSign,
  ChildrenAttitude,
  Education,
  FoodPreference,
  Interest,
} from '@ducks-tinder-client/common';
import type { PairsInfo } from '@shared/api';

export const pairsInfoStub: PairsInfo = {
  count: 3,
  picture: null,
};

export const matchingUserStubs: ShortUser[] = [
  {
    ...shortUserStub,
    id: 'jane',
    age: 21,
    name: 'Jane',
    description:
      'Looking for a strong boyfriend to spare time together walking around the ocean coast...',
    childrenAttitude: ChildrenAttitude.IDoNotWantChildren,
    attentionSign: AttentionSign.Compliments,
    education: Education.DoctorOfSciences,
    foodPreference: FoodPreference.Other,
    distance: 50,
    interests: [
      Interest.Animals,
      Interest.Books,
      Interest.Ballet,
      Interest.Camping,
    ],
  },
  {
    ...shortUserStub,
    id: 'natalie',
    age: 19,
    name: 'Natalie',
    description: "Don't match me if you don't have enough money to amuse me)",
    childrenAttitude: ChildrenAttitude.DoNotKnowYet,
    attentionSign: AttentionSign.Gifts,
    education: Education.MiddleSchool,
    foodPreference: FoodPreference.Omnivore,
    distance: 70,
    interests: [
      Interest.Blogging,
      Interest.Bowling,
      Interest.Dancing,
      Interest.Cinema,
      Interest.Food,
    ],
  },
  {
    ...shortUserStub,
    id: 'emilie',
    age: 19,
    name: 'Emilie',
    description: "Just looking for a friend, don't suggest any relations",
    childrenAttitude: ChildrenAttitude.DoNotKnowYet,
    attentionSign: AttentionSign.TimeTogether,
    education: Education.College,
    foodPreference: FoodPreference.Halal,
    distance: 21,
    interests: [
      Interest.Bicycle,
      Interest.Billiard,
      Interest.Yoga,
      Interest.Tennis,
      Interest.TableGames,
      Interest.Books,
    ],
  },
];
