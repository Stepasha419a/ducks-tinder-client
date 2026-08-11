import type { CheckoutItem } from '@entities/subscription';
import { CheckoutItemType } from '@entities/subscription';
import * as styles from './CheckoutItemLabel.module.scss';

interface Props {
  item: CheckoutItem | null;
}

export const CheckoutItemLabel: React.FC<Props> = ({ item }) => {
  if (!item) {
    return;
  }

  switch (item.type) {
    case CheckoutItemType.Plus: {
      return (
        <div className={styles.summaryRow}>
          <div className={styles.productInfo}>
            <span className={styles.brand}>DATE</span>
            <span className={styles.badge}>PLUS</span>
          </div>
          <div className={styles.priceInfo}>
            <div className={styles.mainPrice}>USD 0</div>
            <div className={styles.subPrice}>USD 0 × 6 months</div>
          </div>
        </div>
      );
    }
  }
};
