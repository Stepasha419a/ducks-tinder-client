import type { FC } from 'react';
import type { ShortUser } from '@shared/api/interfaces';
import type { PreviewUser } from '@entities/user/model';
import { ListInfo } from '../ListInfo/ListInfo';
import { getMoreAboutMe } from '@entities/user/lib';

interface MoreAboutMeListProps {
  user: PreviewUser | ShortUser;
}

export const MoreAboutMeList: FC<MoreAboutMeListProps> = ({ user }) => {
  const items = getMoreAboutMe(user);

  return <ListInfo title="More about me" items={items} />;
};
