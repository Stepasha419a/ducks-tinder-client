import { SettingThumbnail } from '@entities/setting/components';
import { setInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';

export const InterestsSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const interests = useAppSelector(state => state.user.currentUser.interests)
  const errorFields = useAppSelector(state => state.setting.errorFields)

  const setInputHandler = (): void => {
    dispatch(
      setInput({
        inputName: 'interests',
      })
    );
  };

  return (
    <SettingThumbnail
      clickHandler={setInputHandler}
      title="Interests"
      value={
        !interests.length
          ? 'Empty interests'
          : `${interests[0]} and so on...`
      }
      isPointer
      isError={errorFields.includes('interests')}
    />
  );
};
