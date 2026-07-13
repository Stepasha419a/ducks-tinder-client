import type { FC, ReactElement } from 'react';
import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ShortUser, User } from '@ducks-tinder-client/common';

import {
  InterestsList,
  InterestsListPopup,
  LifestyleList,
  MoreAboutMeList,
} from './components';
import styles from './FullPreview.module.scss';
import { useLocaleContext, useOpenModal } from '@shared/model';
import type { InterestsListPopupProps } from './components/InterestsListPopup/InterestsListPopup';

interface FullPreviewPropsInterface {
  user: User | ShortUser;
  extraContent?: ReactElement;
}

export const FullPreview: FC<FullPreviewPropsInterface> = ({
  user,
  extraContent,
}) => {
  const { openModal } = useOpenModal();
  const locale = useLocaleContext();

  return (
    <div>
      <div className={styles.descr}>
        <div className={styles.person}>
          {user.name} <span className={styles.years}>{user.age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span className={styles.name}>
            {`${locale.livesIn} ${user.place?.name || locale.unknownPlace}`}
          </span>
        </div>
        {user.distance !== null && (
          <div className={styles.distance}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <span
              className={styles.text}
            >{`${user.distance} ${locale.distance}`}</span>
          </div>
        )}
      </div>
      {user.description && (
        <div className={styles.description}>{user.description}</div>
      )}
      <InterestsList
        interests={user.interests}
        handleShowAll={async () =>
          openModal<InterestsListPopupProps>({
            Component: InterestsListPopup,
            props: { interestsList: user.interests },
          })
        }
      />
      <MoreAboutMeList user={user} />
      <LifestyleList user={user} />
      {extraContent && extraContent}
    </div>
  );
};
