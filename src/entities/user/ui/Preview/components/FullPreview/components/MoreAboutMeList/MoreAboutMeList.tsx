import type { FC } from 'react';
import { getMoreAboutMe } from '@entities/user';
import type { ShortUser, User } from '@shared/api';
import { ListInfo } from '../components';

interface MoreAboutMeListProps {
  user: User | ShortUser;
}

export const MoreAboutMeList: FC<MoreAboutMeListProps> = ({ user }) => {
  const items = getMoreAboutMe(user);

  return <ListInfo title="More about me" items={items} />;
};
