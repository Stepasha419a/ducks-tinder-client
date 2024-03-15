import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const CommunicationStyleSettingThumbnail = () => {
  const communicationStyle = useAppSelector(
    (state) => state.user.currentUser.communicationStyle
  );

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = communicationStyle ? communicationStyle : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Communication"
      value={value}
      isPointer
    />
  );
};