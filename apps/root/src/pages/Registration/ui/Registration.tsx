import type { ReactElement } from 'react';

import { WithHocSubscription } from '@ducks-tinder-client/common';

import { RegistrationForm } from '@features/RegistrationForm';
import { authHocComposition } from '@shared/lib';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithHocSubscription(authHocComposition, Registration);
