import { useState } from 'react';
import * as styles from './GetDatePlus.module.scss';
import { Link } from 'react-router-dom';

const featureSections = [
  {
    category: 'Upgrade Your Likes',
    items: [
      {
        title: 'Priority Likes',
        description: 'Your Likes will be seen sooner with Priority Likes.',
      },
    ],
  },
  {
    category: 'Enhance Your Experience',
    items: [
      {
        title: '1 Free Boost per month',
        description:
          'Free monthly Boost only available for 1 month or longer subscriptions.',
      },
      { title: '3 Free Super Likes per week' },
    ],
  },
];

const plans = [
  { id: '1w', duration: '1 week', price: 'USD 0/wk' },
  {
    id: '1m',
    duration: '1 month',
    price: 'USD 0/wk',
    savePercent: 0,
    isBestValue: true,
  },
];

export const GetDatePlus = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('1m');

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.featuresSide}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <h2>Date</h2>
              <span className={styles.badge}>PLUS</span>
            </div>
          </div>

          {featureSections.map((section) => (
            <div key={section.category} className={styles.section}>
              <span className={styles.sectionLabel}>{section.category}</span>
              {section.items.map((item, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <div className={styles.checkmark}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className={styles.text}>
                    <h4>{item.title}</h4>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
