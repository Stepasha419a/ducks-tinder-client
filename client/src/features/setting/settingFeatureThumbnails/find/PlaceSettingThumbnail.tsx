import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const PlaceSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const place = useAppSelector(
    (state) => state.user.currentUser.partnerSettings.place
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'place',
        validation: { min: 12, max: 30 },
        innerObjectName: 'partnerSettings',
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Place"
      value={place || 'Empty place'}
      isPointer
      isError={errorFields.includes('place')}
    />
  );
};
