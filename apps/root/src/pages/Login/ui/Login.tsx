import type { ReactElement } from 'react';

import { WithHocSubscription } from '@ducks-tinder-client/common';

import { LoginForm } from '@features/LoginForm';
import { authHocComposition } from '@shared/lib';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithHocSubscription(authHocComposition, Login);
