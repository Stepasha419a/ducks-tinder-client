import { SwipeUserLazy } from '@features/SwipeUser';
import { Failed } from '@features/SwipeUser/ui';

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
  if (showUsers) {
    return <SwipeUserLazy key="loading" small />;
  }

  if (hasErrorFields) {
    return (
      <Failed
        title="You have empty profile information fields"
        text="Click to fill out your profile information"
      />
    );
  }

  if (failedNoNearby) {
    return (
      <Failed
        title="You don't have users currently"
        text="Click to change your prefer settings to get more opportunities"
      />
    );
  }

  return null;
};
