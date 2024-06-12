import type { ReactElement } from 'react';
import { WithAuthRedirect } from '@features/user/lib';
import { LoginForm } from '@features/user/ui';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithAuthRedirect(Login);
