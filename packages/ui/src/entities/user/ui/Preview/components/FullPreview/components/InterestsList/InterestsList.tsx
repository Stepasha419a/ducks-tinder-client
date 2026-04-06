import type { FC } from 'react';

import { ListInfo } from '../components';
import type { Locale } from '@shared/model';
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

  const interestsForLoop = interests
    .slice(0, 4)
    .map((item) => locale.interests[item as keyof Locale['interests']]);

  return (
    <ListInfo
      title={locale.interestsTitle}
      items={interestsForLoop}
      handleShowAll={handleShowAll}
    />
  );
};
