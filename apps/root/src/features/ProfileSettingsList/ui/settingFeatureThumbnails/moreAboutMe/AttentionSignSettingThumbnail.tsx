import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const AttentionSignSettingThumbnail = () => {
  const attentionSign = useAppSelector(
    (state) => state.user.currentUser!.attentionSign
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = attentionSign ? attentionSign : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Attention sign"
      value={value as string}
      isPointer
    />
  );
};
