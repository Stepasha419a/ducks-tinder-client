import classNames from 'classnames';
import * as styles from './SubscriptionStatus.module.scss';
import { faBolt, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSubscriptionStore } from '@entities/subscription';
import { useOpenModal } from '@ducks-tinder-client/ui';
import { SuperLikesPopup } from '@features/SuperLikesPopup';

type AddonType = 'boost' | 'superlike';

export const SubscriptionStatus = () => {
  const subscription = useSubscriptionStore((state) => state.subscription);

  const { openModal } = useOpenModal();

  const handleAddonClick = (type: AddonType) => {
    if (type === 'superlike') {
      openModal({ Component: SuperLikesPopup });

      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addonsGrid}>
        <AddonItem
          type="boost"
          remaining={subscription?.searchBoostsCount || 0}
          label="Get More Boosts"
          onClick={() => handleAddonClick('boost')}
        />
        <AddonItem
          type="superlike"
          remaining={subscription?.superLikesCount || 0}
          label="Get More Super Likes"
          onClick={() => handleAddonClick('superlike')}
        />
      </div>
    </div>
  );
};

const AddonItem: React.FC<{
  type: AddonType;
  remaining: number;
  label: string;
  onClick: () => void;
}> = ({ type, remaining, label, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(styles.addonCard, styles[type])}
  >
    <div className={styles.iconWrapper}>
      {type === 'boost' ? (
        <FontAwesomeIcon icon={faBolt} className={styles.icon} />
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.icon} />
      )}
    </div>
    <span className={styles.remaining}>{remaining} remaining</span>
    <div className={styles.action}>{label}</div>
  </button>
);
