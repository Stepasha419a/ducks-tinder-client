import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const NicknameSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const nickname = useAppSelector((state) => state.user.currentUser.nickname);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'nickname',
        validation: { min: 6, max: 16 },
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Nickname"
      value={nickname || 'unknown'}
      isPointer
    />
  );
};
