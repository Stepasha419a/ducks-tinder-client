import type { FC } from 'react';
import { ListInfo } from '../ui';

interface InterestsListProps {
  interests: string[];
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
