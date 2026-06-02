import type { ReactElement } from 'react';

import {
  APP_AUTH_HOC_COMPOSITION,
  WithHocSubscription,
} from '@ducks-tinder-client/common';
import { LoginForm } from '@ducks-tinder-client/auth';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithHocSubscription(authHocComposition, Login);
