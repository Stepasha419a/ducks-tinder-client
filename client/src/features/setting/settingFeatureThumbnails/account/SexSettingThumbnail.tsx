import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const SexSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const sex = useAppSelector((state) => state.user.currentUser.sex);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'sex',
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Sex"
      value={sex}
      isPointer
      isError={errorFields.includes('sex')}
    />
  );
};
