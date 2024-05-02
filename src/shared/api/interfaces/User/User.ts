import type { INTERESTS } from '../../constant';

export type Range = { from: number; to: number };

export interface Picture {
  id: string;
  name: string;
  order: number;
}

export interface FullPicture {
  id: string;
  name: string;
  order: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ShortPlace {
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  description: string | null;
  nickname: string | null;
  isActivated: boolean;
  age: number | null;
  sex: string | null;
  distance: number | null;
  usersOnlyInDistance: boolean;
  preferSex: string | null;
  preferAgeFrom: number | null;
  preferAgeTo: number | null;

  interests: (typeof INTERESTS)[number][];
  zodiacSign: ZodiacSign | null;
  education: Education | null;
  alcoholAttitude: AlcoholAttitude | null;
  chronotype: Chronotype | null;
  foodPreference: FoodPreference | null;
  pet: Pet | null;
  smokingAttitude: SmokingAttitude | null;
  socialNetworksActivity: SocialNetworksActivity | null;
  trainingAttitude: TrainingAttitude | null;
  childrenAttitude: ChildrenAttitude | null;
  personalityType: PersonalityType | null;
  communicationStyle: CommunicationStyle | null;
  attentionSign: AttentionSign | null;

  place: Place | null;

  pictures: Picture[];
}

export interface ShortUser
  extends Pick<
    User,
    | 'id'
    | 'name'
    | 'age'
    | 'description'
    | 'isActivated'
    | 'distance'
    | 'interests'
    | 'zodiacSign'
    | 'education'
    | 'alcoholAttitude'
    | 'childrenAttitude'
    | 'chronotype'
    | 'communicationStyle'
    | 'attentionSign'
    | 'foodPreference'
    | 'personalityType'
    | 'pet'
    | 'pictures'
    | 'smokingAttitude'
    | 'socialNetworksActivity'
    | 'trainingAttitude'
  > {
  place: ShortPlace | null;
}

export interface ShortUserWithoutDistance extends Omit<ShortUser, 'distance'> {
  distance: never;
}

export enum AlcoholAttitude {
  'Not for me',
  'Sober',
  'Sober curious',
  'On special occasions',
  'Socially on weekends',
  'Most Nights',
}

export enum AttentionSign {
  'Attention gestures',
  'Gifts',
  'Touches',
  'Compliments',
  'Time together',
}

export enum ChildrenAttitude {
  'I want children',
  'I do not want children',
  'I have children and I want more',
  'I have children, but I do not want any more',
  'Do not know yet',
}

export enum Chronotype {
  'Early bird',
  'Night owl',
  'In a spectrum',
}

export enum CommunicationStyle {
  'Messaging a lot',
  'Phone communication',
  'Video chats',
  'Do not like messaging',
  'Meet in person',
}

export enum Education {
  'Bachelor',
  'College',
  'Middle school',
  'Doctor of sciences',
  'Postgraduate',
  'Magistracy',
  'Technical school',
}

export enum FoodPreference {
  'Vegan',
  'Vegetarian',
  'Pescatarian',
  'Kosher',
  'Halal',
  'Carnivore',
  'Omnivore',
  'Other',
}

export enum PersonalityType {
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'Entertainer',
}

export enum Pet {
  'Dog',
  'Cat',
  'Reptile',
  'Amphibian',
  'Bird',
  'Fish',
  'Other',
  'Turtle',
  'Hamster',
  'Rabbit',
  'Pet-free',
  'All the pets',
  'Want a pet',
  'Allergic to pets',
}

export enum SmokingAttitude {
  'Social smoker',
  'Smoker when drinking',
  'Non-smoker',
  'Smoker',
  'Trying to quit',
}

export enum SocialNetworksActivity {
  'Influencer status',
  'Socially active',
  'Off the grid',
  'Passive scroller',
}

export enum TrainingAttitude {
  'Everyday',
  'Often',
  'Sometimes',
  'Gym rat',
  'Occasionally',
  'Never',
}

export enum ZodiacSign {
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpius',
  'Sagittarius',
  'Capricornus',
  'Aquarius',
  'Pisces',
}
