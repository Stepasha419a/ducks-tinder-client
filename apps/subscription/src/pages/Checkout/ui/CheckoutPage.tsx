import { Button } from '@ducks-tinder-client/ui';
import {
  faChevronLeft,
  faLock,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './CheckoutPage.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={async () => navigate(-1)} className={styles.backBtn}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className={styles.pageTitle}>Checkout</h1>
      </header>

      <main className={styles.container}>
        <div>
          <section>
            <h3 className={styles.sectionTitle}>Choose a Payment Method</h3>
            <div className={styles.paymentMethods}>
              <div className={classNames(styles.methodCard, styles.active)}>
                <FontAwesomeIcon icon={faStar} className={styles.methodIcon} />
                <span>Github Star</span>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.formHeader}>
              <FontAwesomeIcon icon={faStar} className={styles.formIcon} />
              <span>Give a Star to proceed</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="nickname" className={styles.label}>
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                className={styles.input}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your github nickname"
              />
            </div>

            <div className={styles.legalInfo}>
              <p>All fields are required</p>
              <p>
                Your nickname will be used to verify the star on the repository.
              </p>
            </div>
          </section>
        </div>

        <div>
          <div className={styles.summaryCard}>
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

            <div className={styles.summaryRow}>
              <span>Sales Tax</span>
              <span>Plus applicable sales tax</span>
            </div>

            <div className={classNames(styles.summaryRow, styles.totalRow)}>
              <span className={styles.totalLabel}>TOTAL:</span>
              <span className={styles.totalPrice}>USD 0</span>
            </div>
          </div>

          <Button extraClassName={styles.buyBtn} disabled={!nickname}>
            Buy Now
          </Button>

          <div className={styles.secureBadge}>
            <FontAwesomeIcon icon={faLock} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </main>
    </div>
  );
};
