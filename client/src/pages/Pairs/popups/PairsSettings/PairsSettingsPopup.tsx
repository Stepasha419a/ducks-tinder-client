import classNames from 'classnames';
import { Control, useController, UseFormReset } from 'react-hook-form';
import { PairSorts } from '../../../../models/Sorts/Sorts';
import { interestsForLoop } from '../../../../models/User/User';
import { Button, CheckboxInput, Popup, RangeInput } from '../../../../components/ui';
import styles from './PairsSettingsPopup.module.scss';

interface PairsSettingsPopupProps {
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
  control: Control<PairSorts>;
  submitHandler: () => void;
  interests: string[];
  toggleInterest: (item: string) => void;
  account: string[];
  toggleAccount: (item: string) => void;
  reset: UseFormReset<PairSorts>;
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({
  setIsInterestsSettingPopupOpen,
  control,
  submitHandler,
  interests,
  toggleInterest,
  account,
  toggleAccount,
  reset,
}) => {
  const {
    field: { value: distance, onChange: setDistance },
  } = useController({ name: 'distance', control });

  const {
    field: { value: age, onChange: setAge },
  } = useController({ name: 'age', control });

  const {
    field: { value: photosCount, onChange: setPhotosCount },
  } = useController({ name: 'photos', control });

  const photosCountArrForLoop = [...new Array(9)];

  return (
    <Popup title="Likes filter" closeHandler={submitHandler}>
      <form onSubmit={submitHandler}>
        <div className={styles.setting}>
          <div className={styles.name}>Max distantion</div>
          <div className={styles.value}>{distance} km</div>
          <div className={`${styles.change} ${styles.margin}`}>
            <RangeInput
              value={{ value: distance }}
              setValue={(value) => setDistance(value.value!)}
              min={2}
              max={100}
            />
          </div>
        </div>
        <div className={styles.separator} />
        <div className={styles.setting}>
          <div className={styles.name}>Age range</div>
          <div className={styles.value}>
            from {age.from} to {age.to}
          </div>
          <div className={`${styles.change} ${styles.margin}`}>
            <RangeInput
              value={{ min: age.from, max: age.to }}
              setValue={(value) => setAge({ from: value.min!, to: value.max! })}
              min={18}
              max={100}
              isMultiple
            />
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.setting}>
          <div className={styles.name}>Min photo's count</div>
          <div className={`${styles.change} ${styles.flex}`}>
            {photosCountArrForLoop.map((_, i) => {
              const content = i + 1;
              const cnItem = classNames(
                styles.item,
                photosCount === content && styles.active
              );
              return (
                <div
                  onClick={() => setPhotosCount(content)}
                  key={i}
                  className={cnItem}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.setting}>
          <div className={styles.name}>Interests</div>
          <div className={`${styles.change} ${styles.flex}`}>
            {interestsForLoop.slice(0, 3).map((item) => {
              const cnItem = classNames(
                styles.item,
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
          </div>
          <div
            onClick={() => setIsInterestsSettingPopupOpen(true)}
            className={styles.showAll}
          >
            Show all
          </div>
        </div>
        <div className={styles.separator} />
        <div className={`${styles.setting} ${styles.checkbox}`}>
          <CheckboxInput
            checked={account.includes('identify confirmed')}
            onChange={() => toggleAccount('identify confirmed')}
            text="Identify confirmed"
          />
        </div>
        <div className={styles.separator}></div>
        <div className={`${styles.setting} ${styles.checkbox}`}>
          <CheckboxInput
            checked={account.includes('have interests')}
            onChange={() => toggleAccount('have interests')}
            text="Have interests"
          />
        </div>
        <div className={styles.separator}></div>
        <div className={styles.btns}>
          <Button
            onClick={() => reset()}
            extraClassName={`${styles.btn} ${styles.leftBorder}`}
          >
            Clear
          </Button>
          <Button
            type="submit"
            extraClassName={`${styles.btn} ${styles.rightBorder}`}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default PairsSettingsPopup;