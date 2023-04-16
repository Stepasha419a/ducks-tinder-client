import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const NameSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const name = useAppSelector((state) => state.user.currentUser.name);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'name',
        validation: { min: 2, max: 14 },
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Name"
      value={name}
      isPointer
    />
  );
};
