import type { FC } from 'react';

import type { ShortUser, User } from '@ducks-tinder-client/common';

import { getMoreAboutMe } from '@entities/user';

import { ListInfo } from '../components';
import { useLocaleContext } from '@shared/model';

interface MoreAboutMeListProps {
  user: User | ShortUser;
}

export const MoreAboutMeList: FC<MoreAboutMeListProps> = ({ user }) => {
  const locale = useLocaleContext();

  const items = getMoreAboutMe(user, locale);

  return <ListInfo title={locale.moreAboutMe} items={items} />;
};
