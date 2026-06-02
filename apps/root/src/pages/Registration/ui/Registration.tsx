import type { ReactElement } from 'react';

import {
  APP_AUTH_HOC_COMPOSITION,
  WithHocSubscription,
} from '@ducks-tinder-client/common';
import { RegistrationForm } from '@ducks-tinder-client/auth';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithHocSubscription(authHocComposition, Registration);
