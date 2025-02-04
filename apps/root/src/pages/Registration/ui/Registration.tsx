import { WithHocSubscription } from '@ducks-tinder-client/common';
import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/RegistrationForm';
import { authHocComposition } from '@shared/lib';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithHocSubscription(authHocComposition, Registration);
