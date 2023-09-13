import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const AttentionSignSettingThumbnail = () => {
  const attentionSign = useAppSelector(
    (state) => state.user.currentUser.attentionSign
  );

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = attentionSign ? attentionSign.name : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Attention sign"
      value={value}
      isPointer
    />
  );
};
