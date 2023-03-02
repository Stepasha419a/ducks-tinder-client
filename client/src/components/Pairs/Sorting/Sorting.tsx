import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC } from 'react';
import { interestsForLoop } from '../Pairs.constants';
import { Sorts } from '../utils/PairsUtils';
import styles from './Sorting.module.scss';

interface SortingProps {
  pairSorts: Sorts;
  toggleSort: (sortSetting: string, field: 'account' | 'interests') => void;
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: (value: boolean) => void;
}

const Sorting: FC<SortingProps> = ({
  pairSorts,
  toggleSort,
  isSortPopupOpen,
  setIsSortPopupOpen,
}) => {
  const cnPopupBtn = classNames(styles.sort, isSortPopupOpen && styles.active);
  const cnInterestsBtn = classNames(
    styles.sort,
    pairSorts.account.includes('have interests') && styles.active
  );

  return (
    <div className={styles.sorting}>
      <div onClick={() => setIsSortPopupOpen(true)} className={cnPopupBtn}>
        <FontAwesomeIcon className={styles.icon} icon={faSliders} />
      </div>
      {interestsForLoop.map((item) => {
        const cnItem = classNames(
          styles.sort,
          pairSorts.interests.includes(item) && styles.active
        );
        return (
          <div
            onClick={() => toggleSort(item, 'interests')}
            key={item}
            className={cnItem}
          >
            {item}
          </div>
        );
      })}
      <div
        onClick={() => toggleSort('have interests', 'account')}
        className={cnInterestsBtn}
      >
        have interests
      </div>
    </div>
  );
};

export default Sorting;
