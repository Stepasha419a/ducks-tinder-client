import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const PreferSexSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const preferSex = useAppSelector((state) => state.user.currentUser.preferSex);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'preferSex',
        innerObjectName: 'partnerSettings',
        formName: 'Interested in',
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Interested in"
      value={preferSex}
      isPointer
      isError={errorFields.includes('preferSex')}
    />
  );
};
