import type { ShortUser, User } from '@ducks-tinder-client/common';
import type { FC } from 'react';
import { getLifestyle } from '@entities/user';
import { ListInfo } from '../components';

interface LifestyleListProps {
  user: User | ShortUser;
}

export const LifestyleList: FC<LifestyleListProps> = ({ user }) => {
  const items = getLifestyle(user);

  return <ListInfo title="Lifestyle" items={items} />;
};
