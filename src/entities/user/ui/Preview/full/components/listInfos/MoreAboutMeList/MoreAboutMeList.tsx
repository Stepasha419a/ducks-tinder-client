import type { FC } from 'react';
import { getMoreAboutMe } from '@entities/user/lib';
import type { ShortUser, User } from '@shared/api/interfaces';
import { ListInfo } from '../ListInfo/ListInfo';

interface MoreAboutMeListProps {
  user: User | ShortUser;
}

export const MoreAboutMeList: FC<MoreAboutMeListProps> = ({ user }) => {
  const items = getMoreAboutMe(user);

  return <ListInfo title="More about me" items={items} />;
};
