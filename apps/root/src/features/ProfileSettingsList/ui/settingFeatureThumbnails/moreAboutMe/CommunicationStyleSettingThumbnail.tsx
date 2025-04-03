import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const CommunicationStyleSettingThumbnail = () => {
  const communicationStyle = useAppSelector(
    (state) => state.user.currentUser!.communicationStyle
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = communicationStyle ? communicationStyle : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Communication"
      value={value as string}
      isPointer
    />
  );
};
