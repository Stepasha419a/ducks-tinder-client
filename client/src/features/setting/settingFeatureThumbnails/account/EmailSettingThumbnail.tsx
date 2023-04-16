import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const EmailSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.user.currentUser.email);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'email',
        validation: { min: 0, max: 40, email: true },
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Email"
      value={email}
      isPointer
    />
  );
};
