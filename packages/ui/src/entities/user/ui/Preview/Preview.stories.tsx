/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { ShortUser } from '@ducks-tinder-client/common';
import {
  AlcoholAttitude,
  AttentionSign,
  ChildrenAttitude,
  Chronotype,
  CommunicationStyle,
  Education,
  FoodPreference,
  Interest,
  PersonalityType,
  Pet,
  SmokingAttitude,
  SocialNetworksActivity,
  TrainingAttitude,
  ZodiacSign,
} from '@ducks-tinder-client/common';

import { Preview } from './Preview';

const user: ShortUser = {
  id: 'id',
  age: 20,
  alcoholAttitude: AlcoholAttitude.NotForMe,
  attentionSign: AttentionSign.Gifts,
  childrenAttitude: ChildrenAttitude.DoNotKnowYet,
  chronotype: Chronotype.InASpectrum,
  communicationStyle: CommunicationStyle.MeetInPerson,
  description: 'Looks for a handsome guy to spend time travelling together',
  distance: 90,
  education: Education.Bachelor,
  foodPreference: FoodPreference.Omnivore,
  interests: [
    Interest.Animals,
    Interest.Ballet,
    Interest.Blogging,
    Interest.Books,
    Interest.Cars,
    Interest.Cinema,
    Interest.Cooking,
  ],
  isActivated: true,
  name: 'Stephanie',
  personalityType: PersonalityType.Entertainer,
  pet: Pet.Cat,
  pictures: [
    { id: 'id', name: 'name', order: 0 },
    { id: 'id-2', name: 'name-2', order: 1 },
  ],
  place: { name: 'Russia, Moscow Oblast' },
  smokingAttitude: SmokingAttitude.NonSmoker,
  socialNetworksActivity: SocialNetworksActivity.PassiveScroller,
  trainingAttitude: TrainingAttitude.Occasionally,
  zodiacSign: ZodiacSign.Pisces,
};

const meta = {
  title: 'Entities/Preview',
  component: Preview,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const [isFull, setIsFull] = useState(false);

    return (
      <div style={{ height: '650px', width: '440px' }}>
        <Preview
          {...args}
          user={user}
          isFull={isFull}
          setIsFullPreview={setIsFull}
        />
      </div>
    );
  },
  args: {
    disabled: false,
    isShadow: false,
    noSlider: false,
    user,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [isFull, setIsFull] = useState(false);

    return (
      <div style={{ height: '650px', width: '440px' }}>
        <Preview
          {...args}
          user={user}
          isFull={isFull}
          setIsFullPreview={setIsFull}
        />
      </div>
    );
  },
  args: {
    disabled: true,
    isShadow: false,
    noSlider: false,
    user,
  },
};

export const Shadow: Story = {
  render: (args) => {
    const [isFull, setIsFull] = useState(false);

    return (
      <div style={{ height: '650px', width: '440px' }}>
        <Preview
          {...args}
          user={user}
          isFull={isFull}
          setIsFullPreview={setIsFull}
        />
      </div>
    );
  },
  args: {
    disabled: false,
    isShadow: true,
    noSlider: false,
    user,
  },
};

export const WithoutSlider: Story = {
  render: (args) => {
    const [isFull, setIsFull] = useState(false);

    return (
      <div style={{ height: '650px', width: '440px' }}>
        <Preview
          {...args}
          user={user}
          isFull={isFull}
          setIsFullPreview={setIsFull}
        />
      </div>
    );
  },
  args: {
    disabled: false,
    isShadow: false,
    noSlider: true,
    user,
  },
};

export const ExtraContent: Story = {
  render: (args) => {
    const [isFull, setIsFull] = useState(false);

    return (
      <div style={{ height: '650px', width: '440px' }}>
        <Preview
          {...args}
          user={user}
          isFull={isFull}
          setIsFullPreview={setIsFull}
        />
      </div>
    );
  },
  args: {
    disabled: false,
    isShadow: false,
    extraContent: <div>extra content</div>,
    noSlider: false,
    user,
  },
};
