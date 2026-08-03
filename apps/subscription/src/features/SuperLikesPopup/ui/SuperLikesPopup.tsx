import { useState } from 'react';
import classNames from 'classnames';
import {
  addModal,
  Button,
  Popup,
  useModalProps,
} from '@ducks-tinder-client/ui';

import * as styles from './SuperLikesPopup.module.scss';

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
          <div className={styles.starIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#starGradient)"
              />
              <defs>
                <linearGradient
                  id="starGradient"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#50b3ff" />
                  <stop offset="1" stopColor="#3d5afe" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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
