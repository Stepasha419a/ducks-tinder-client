import type { FC } from 'react';
import type { ShortUser } from '@shared/api/interfaces';
import type { PreviewUser } from '@entities/user/model';
import { ListInfo } from '../ListInfo/ListInfo';
import { getLifestyle } from '@entities/user/lib';

interface LifestyleListProps {
  user: PreviewUser | ShortUser;
}

export const LifestyleList: FC<LifestyleListProps> = ({ user }) => {
  const items = getLifestyle(user);

  return <ListInfo title="Lifestyle" items={items} />;
};
