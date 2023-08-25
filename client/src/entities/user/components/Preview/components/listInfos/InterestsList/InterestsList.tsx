import type { FC } from 'react';
import type { NameObject } from '@/shared/api/interfaces';
import { ListInfo } from '../ListInfo/ListInfo';

interface InterestsListProps {
  interests: NameObject[];
  handleShowAll?: () => void;
}

export const InterestsList: FC<InterestsListProps> = ({
  interests,
  handleShowAll,
}) => {
  const interestsForLoop = interests.slice(0, 4);

  return (
    <ListInfo
      title="Interests"
      items={interestsForLoop}
      handleShowAll={handleShowAll}
    />
  );
};
