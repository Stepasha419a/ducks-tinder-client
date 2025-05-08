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

  interests: Interest[];
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

export enum Interest {
  Tennis = 'tennis',
  PingPong = 'ping pong',
  Swimming = 'swimming',
  Karting = 'karting',
  HorseRidding = 'horse ridding',
  Hunting = 'hunting',
  Fishing = 'fishing',
  Skateboarding = 'skateboarding',
  Bicycle = 'bicycle',
  Running = 'running',
  Fighting = 'fighting',
  Surfing = 'surfing',
  Snowboarding = 'snowboarding',
  Shooting = 'shooting',
  Parachuting = 'parachuting',
  Paintball = 'paintball',
  Bowling = 'bowling',
  Billiard = 'billiard',
  Skates = 'skates',
  Dancing = 'dancing',
  Cosplay = 'cosplay',
  Ballet = 'ballet',
  RoomQuest = 'room quest',
  Fitness = 'fitness',
  Yoga = 'yoga',
  Meditation = 'meditation',
  Tourism = 'tourism',
  Travelling = 'travelling',
  Hiking = 'hiking',
  Camping = 'camping',
  Cars = 'cars',
  Education = 'education',
  ForeignLanguages = 'foreign languages',
  Cards = 'cards',
  Poker = 'poker',
  Chess = 'chess',
  Checkers = 'checkers',
  Nard = 'nard',
  Psychology = 'psychology',
  TableGames = 'table games',
  Sport = 'sport',
  Blogging = 'blogging',
  ComputerGames = 'computer games',
  Programming = 'programming',
  Drawing = 'drawing',
  Drawing3D = '3D drawing',
  Gardener = 'gardener',
  Animals = 'animals',
  Volunteering = 'volunteering',
  Serials = 'serials',
  Books = 'books',
  Movies = 'movies',
  Cinema = 'cinema',
  Food = 'food',
  Cooking = 'cooking',
  Photo = 'photo',
  Design = 'design',
  Writing = 'writing',
  Music = 'music',
  Handmade = 'handmade',
  Football = 'football',
  Ski = 'ski',
  Volleyball = 'volleyball',
}

export enum AlcoholAttitude {
  NotForMe = 'Not for me',
  Sober = 'Sober',
  SoberCurious = 'Sober curious',
  OnSpecialOccasions = 'On special occasions',
  SociallyOnWeekends = 'Socially on weekends',
  MostNights = 'Most Nights',
}

export enum AttentionSign {
  AttentionGestures = 'Attention gestures',
  Gifts = 'Gifts',
  Touches = 'Touches',
  Compliments = 'Compliments',
  TimeTogether = 'Time together',
}

export enum ChildrenAttitude {
  IWantChildren = 'I want children',
  IDoNotWantChildren = 'I do not want children',
  IHaveChildrenAndIWantMore = 'I have children and I want more',
  IHaveChildrenButIDoNotWantAnyMore = 'I have children, but I do not want any more',
  DoNotKnowYet = 'Do not know yet',
}

export enum Chronotype {
  EarlyBird = 'Early bird',
  NightOwl = 'Night owl',
  InASpectrum = 'In a spectrum',
}

export enum CommunicationStyle {
  MessagingALot = 'Messaging a lot',
  PhoneCommunication = 'Phone communication',
  VideoChats = 'Video chats',
  DoNotLikeMessaging = 'Do not like messaging',
  MeetInPerson = 'Meet in person',
}

export enum Education {
  Bachelor = 'Bachelor',
  College = 'College',
  MiddleSchool = 'Middle school',
  DoctorOfSciences = 'Doctor of sciences',
  Postgraduate = 'Postgraduate',
  Magistracy = 'Magistracy',
  TechnicalSchool = 'Technical school',
}

export enum FoodPreference {
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian',
  Pescatarian = 'Pescatarian',
  Kosher = 'Kosher',
  Halal = 'Halal',
  Carnivore = 'Carnivore',
  Omnivore = 'Omnivore',
  Other = 'Other',
}

export enum PersonalityType {
  INTJ = 'INTJ',
  INTP = 'INTP',
  ENTJ = 'ENTJ',
  ENTP = 'ENTP',
  INFJ = 'INFJ',
  INFP = 'INFP',
  ENFJ = 'ENFJ',
  ENFP = 'ENFP',
  ISTJ = 'ISTJ',
  ISFJ = 'ISFJ',
  ESTJ = 'ESTJ',
  ESFJ = 'ESFJ',
  ISTP = 'ISTP',
  ISFP = 'ISFP',
  ESTP = 'ESTP',
  Entertainer = 'Entertainer',
}

export enum Pet {
  Dog = 'Dog',
  Cat = 'Cat',
  Reptile = 'Reptile',
  Amphibian = 'Amphibian',
  Bird = 'Bird',
  Fish = 'Fish',
  Other = 'Other',
  Turtle = 'Turtle',
  Hamster = 'Hamster',
  Rabbit = 'Rabbit',
  PetFree = 'Pet-free',
  AllThePets = 'All the pets',
  WantAPet = 'Want a pet',
  AllergicToPets = 'Allergic to pets',
}

export enum SmokingAttitude {
  SocialSmoker = 'Social smoker',
  SmokerWhenDrinking = 'Smoker when drinking',
  NonSmoker = 'Non-smoker',
  Smoker = 'Smoker',
  TryingToQuit = 'Trying to quit',
}

export enum SocialNetworksActivity {
  InfluencerStatus = 'Influencer status',
  SociallyActive = 'Socially active',
  OffTheGrid = 'Off the grid',
  PassiveScroller = 'Passive scroller',
}

export enum TrainingAttitude {
  Everyday = 'Everyday',
  Often = 'Often',
  Sometimes = 'Sometimes',
  GymRat = 'Gym rat',
  Occasionally = 'Occasionally',
  Never = 'Never',
}

export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpius = 'Scorpius',
  Sagittarius = 'Sagittarius',
  Capricornus = 'Capricornus',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}
