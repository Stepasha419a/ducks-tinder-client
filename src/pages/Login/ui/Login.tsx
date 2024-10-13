import type { ReactElement } from 'react';
import { LoginForm } from '@features/LoginForm';
import { WithHocSubscription, authHocComposition } from '@shared/lib';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithHocSubscription(authHocComposition, Login);
