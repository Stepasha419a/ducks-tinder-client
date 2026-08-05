import { useState } from 'react';
import classNames from 'classnames';
import {
  addModal,
  Button,
  Popup,
  useModalProps,
} from '@ducks-tinder-client/ui';

import * as styles from './SuperLikesPopup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface PricingPlan {
  id: number;
  count: number;
  pricePerUnit: string;
  totalPrice: string;
  label?: string;
  discount?: string;
}

const plans: PricingPlan[] = [
  {
    id: 1,
    count: 3,
    pricePerUnit: 'USD 0/ea',
    totalPrice: 'USD 0 total',
  },
  {
    id: 2,
    count: 5,
    pricePerUnit: 'USD 0/ea',
    totalPrice: 'USD 0 total',
    label: 'Popular',
    discount: 'Save 0%',
  },
];

export const SuperLikesPopup = () => {
  const { resolveModal } = useModalProps(SuperLikesPopup);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(1);

  const handleContinue = () => {
    resolveModal(null);
  };

  return (
    <Popup
      closeHandler={() => resolveModal(null)}
      size="l"
      extraClassName={styles.popupCustom}
    >
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
        </div>

        <h2 className={styles.title}>Get Super Likes</h2>
        <p className={styles.subtitle}>
          Stand out with Super Like. You're 3x more likely to get a match!
        </p>

        <div className={styles.plansList}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={classNames(styles.planCard, {
                [styles.activePlan]: selectedPlanId === plan.id,
              })}
              onClick={() => setSelectedPlanId(plan.id)}
            >
              {(plan.label || plan.discount) && (
                <div className={styles.planHeader}>
                  <span className={styles.planLabel}>{plan.label}</span>
                  <span className={styles.planDiscount}>{plan.discount}</span>
                </div>
              )}
              <div className={styles.planBody}>
                <span className={styles.count}>{plan.count} Super Likes</span>
                <div className={styles.priceInfo}>
                  <div className={styles.perUnit}>{plan.pricePerUnit}</div>
                  <div className={styles.total}>{plan.totalPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.separator}>or</div>

        <div className={styles.goldPromo}>
          <div className={styles.goldText}>
            <div className={styles.goldTitle}>Get Date Plus</div>
            <div className={styles.goldSubtitle}>
              2 free Super Likes per week
            </div>
          </div>
          <Button
            extraClassName={styles.selectBtn}
            onClick={() => console.log('Gold selected')}
          >
            Select
          </Button>
        </div>

        <Button onClick={handleContinue} extraClassName={styles.continueBtn}>
          Continue
        </Button>
      </div>
    </Popup>
  );
};

addModal(SuperLikesPopup, 'SuperLikesPopup');
