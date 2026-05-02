import { SwipeUserLazy } from '@features/SwipeUser';
import { Failed } from '@features/SwipeUser/ui';
import { useTranslation } from 'react-i18next';

interface Props {
  hasErrorFields: boolean;
  failedNoNearby: boolean;
  showUsers: boolean;
}

export const FailedTinderUser: React.FC<Props> = ({
  failedNoNearby,
  hasErrorFields,
  showUsers,
}) => {
  const { t } = useTranslation();

  if (showUsers) {
    return <SwipeUserLazy key="loading" small />;
  }

  if (hasErrorFields) {
    return (
      <Failed
        title={t('tinder.errorFields')}
        text={t('tinder.errorFieldsDescription')}
      />
    );
  }

  if (failedNoNearby) {
    return (
      <Failed
        title={t('tinder.noUsers')}
        text={t('tinder.noUsersDescription')}
      />
    );
  }

  return null;
};
