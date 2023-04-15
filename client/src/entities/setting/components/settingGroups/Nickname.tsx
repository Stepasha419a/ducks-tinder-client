import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import type { InnerObjectName, SettingInputName } from '@shared/api/interfaces';
import type { Validation } from '@shared/interfaces';
import { SettingThumbnail, SettingsGroup } from '@shared/ui';

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
    <SettingsGroup
      title="Internet account"
      descr="Create a username, share it and start searching for couples on Tinder
      around the world."
    >
      <SettingThumbnail
        clickHandler={SetNicknameHandler}
        title="Nickname"
        value={currentUser.nickname || 'unknown'}
        isPointer
      />
    </SettingsGroup>
  );
};
