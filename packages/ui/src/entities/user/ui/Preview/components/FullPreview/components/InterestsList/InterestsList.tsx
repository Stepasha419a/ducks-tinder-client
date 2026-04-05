import type { FC } from 'react';

import { ListInfo } from '../components';
import { useLocaleContext } from '@shared/model';

interface InterestsListProps {
  interests: string[];
  handleShowAll?: () => void;
}

export const InterestsList: FC<InterestsListProps> = ({
  interests,
  handleShowAll,
}) => {
  const locale = useLocaleContext();

  const interestsForLoop = interests.slice(0, 4);

  return (
    <ListInfo
      title={locale.interests}
      items={interestsForLoop}
      handleShowAll={handleShowAll}
    />
  );
};
