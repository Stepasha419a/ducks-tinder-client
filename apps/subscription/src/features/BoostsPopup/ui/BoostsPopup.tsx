import { useState, useRef } from 'react';
import classNames from 'classnames';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import {
  addModal,
  Button,
  Popup,
  useModalProps,
} from '@ducks-tinder-client/ui';

import * as styles from './BoostsPopup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BoostPlan {
  id: number;
  count: number;
  pricePerUnit: string;
  label?: string;
  discount?: string;
}

const plans: BoostPlan[] = [
  { id: 1, count: 1, pricePerUnit: 'USD 0/ea' },
  {
    id: 2,
    count: 3,
    pricePerUnit: 'USD 0/ea',
    label: 'Popular',
    discount: 'Save 0%',
  },
  {
    id: 3,
    count: 5,
    pricePerUnit: 'USD 0/ea',
    label: 'Best Value',
    discount: 'Save 0%',
  },
];

const settings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '100px',
  initialSlide: 1,
  arrows: false,
};

export const BoostsPopup = () => {
  const { resolveModal } = useModalProps(BoostsPopup);
  const [activeIndex, setActiveIndex] = useState(1);
  const sliderRef = useRef<Slider>(null);

  return (
    <Popup
      closeHandler={() => resolveModal(null)}
      size="l"
      extraClassName={styles.popupCustom}
    >
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={faBolt} className={styles.boltIconMain} />
        </div>

        <h2 className={styles.title}>Be Seen</h2>
        <p className={styles.subtitle}>
          Be a top profile in your area for 30 minutes to get more matches!
        </p>

        <div className={styles.sliderWrapper}>
          <Slider
            ref={sliderRef}
            {...settings}
            beforeChange={(_: number, next: number) => setActiveIndex(next)}
          >
            {plans.map((plan, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={plan.id} className={styles.slideItem}>
                  <div
                    className={classNames(styles.planCard, {
                      [styles.activePlan]: isActive,
                      [styles.sidePlan]: !isActive,
                    })}
                  >
                    {plan.label && (
                      <div className={styles.cardHeader}>{plan.label}</div>
                    )}

                    <div className={styles.cardBody}>
                      <span className={styles.count}>{plan.count} Boosts</span>

                      <div className={styles.boltCircleWrapper}>
                        <div className={styles.boltCircle}>
                          <FontAwesomeIcon icon={faBolt} />
                        </div>
                      </div>

                      <div className={styles.price}>{plan.pricePerUnit}</div>

                      {plan.discount && (
                        <div className={styles.discountBadge}>
                          {plan.discount}
                        </div>
                      )}

                      <Button
                        extraClassName={styles.cardSelectBtn}
                        onClick={() => resolveModal(null)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        <div className={styles.controlsRow}>
          <button
            className={styles.navBtn}
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className={styles.dots}>
            {plans.map((_, i) => (
              <div
                key={i}
                className={classNames(styles.dot, {
                  [styles.activeDot]: i === activeIndex,
                })}
                onClick={() => sliderRef.current?.slickGoTo(i)}
              />
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => sliderRef.current?.slickNext()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className={styles.separator}>or</div>

        <div className={styles.plusPromo}>
          <div>
            <div className={styles.promoTitle}>Get Date Plus</div>
          </div>
          <Button
            extraClassName={styles.selectBtn}
            onClick={() => console.log('Plus selected')}
          >
            Select
          </Button>
        </div>
      </div>
    </Popup>
  );
};

addModal(BoostsPopup, 'BoostsPopup');
