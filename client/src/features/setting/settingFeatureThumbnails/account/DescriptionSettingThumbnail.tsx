import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const DescriptionSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const description = useAppSelector(
    (state) => state.user.currentUser.description
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'description',
        validation: { min: 50, max: 400 },
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Description"
      value={description || 'Empty description'}
      isPointer
      isError={errorFields.includes('description')}
      isOverflow
    />
  );
};
