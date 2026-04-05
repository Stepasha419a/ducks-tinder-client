import type { FC } from 'react';

import type { ShortUser, User } from '@ducks-tinder-client/common';

import { getLifestyle } from '@entities/user';

import { ListInfo } from '../components';
import { useLocaleContext } from '@shared/model';

interface LifestyleListProps {
  user: User | ShortUser;
}

export const LifestyleList: FC<LifestyleListProps> = ({ user }) => {
  const locale = useLocaleContext();

  const items = getLifestyle(user);

  return <ListInfo title={locale.lifestyle} items={items} />;
};
