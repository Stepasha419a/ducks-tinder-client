import type { FC } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@hooks';
import type { InnerObjectName, SettingInputName } from '@shared/api/interfaces';
import type { Validation } from '@shared/interfaces';
import { SettingGroup } from '@shared/ui';
import styles from './SettingsGroup.module.scss';

interface NicknameProps {
  setInputHandler: (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => void;
}

export const Nickname: FC<NicknameProps> = ({ setInputHandler }) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const SetNicknameHandler = (): void => {
    setInputHandler('nickname', { min: 6, max: 16 });
  };

  return (
    <SettingGroup
      title="Internet account"
      descr="Create a username, share it and start searching for couples on Tinder
      around the world."
    >
      <div
        onClick={SetNicknameHandler}
        className={`${styles.item} ${styles.pointer}`}
      >
        <div className={styles.descr}>
          <div className={styles.title}>Nickname</div>
          <div className={styles.setting}>
            {currentUser.nickname || 'unknown'}
            <FontAwesomeIcon icon={faAngleRight} className={styles.openIcon} />
          </div>
        </div>
      </div>
    </SettingGroup>
  );
};
