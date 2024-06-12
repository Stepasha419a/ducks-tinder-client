import type { FC } from 'react';
import type { ShortUser, User } from '@shared/api/interfaces';
import { ListInfo } from '../ListInfo/ListInfo';
import { getLifestyle } from '@entities/user/lib';

interface LifestyleListProps {
  user: User | ShortUser;
}

export const LifestyleList: FC<LifestyleListProps> = ({ user }) => {
  const items = getLifestyle(user);

  return <ListInfo title="Lifestyle" items={items} />;
};
