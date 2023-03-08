import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC } from 'react';
import { interestsForLoop } from '../Pairs.constants';
import styles from './Sorting.module.scss';

interface SortingProps {
  interests: string[];
  toggleInterest: (item: string) => void;
  account: string[];
  toggleAccount: (item: string) => void;
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: (value: boolean) => void;
}

const Sorting: FC<SortingProps> = ({
  interests,
  toggleInterest,
  account,
  toggleAccount,
  isSortPopupOpen,
  setIsSortPopupOpen,
}) => {
  const cnPopupBtn = classNames(styles.sort, isSortPopupOpen && styles.active);
  const cnInterestsBtn = classNames(
    styles.sort,
    account.includes('have interests') && styles.active
  );

  return (
    <div className={styles.sorting}>
      <div onClick={() => setIsSortPopupOpen(true)} className={cnPopupBtn}>
        <FontAwesomeIcon className={styles.icon} icon={faSliders} />
      </div>
      {interestsForLoop.map((item) => {
        const cnItem = classNames(
          styles.sort,
          interests.includes(item) && styles.active
        );
        return (
          <div
            onClick={() => toggleInterest(item)}
            key={item}
            className={cnItem}
          >
            {item}
          </div>
        );
      })}
      <div
        onClick={() => toggleAccount('have interests')}
        className={cnInterestsBtn}
      >
        have interests
      </div>
    </div>
  );
};

export default Sorting;
