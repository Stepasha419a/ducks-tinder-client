import type { FC } from 'react';

import type { ShortUser, User } from '@ducks-tinder-client/common';

import { getMoreAboutMe } from '@entities/user';

import { ListInfo } from '../components';

interface MoreAboutMeListProps {
  user: User | ShortUser;
}

export const MoreAboutMeList: FC<MoreAboutMeListProps> = ({ user }) => {
  const items = getMoreAboutMe(user);

  return <ListInfo title="More about me" items={items} />;
};
