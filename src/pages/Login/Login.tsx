import type { ReactElement } from 'react';
import { LoginForm } from '@features/user/ui';
import { WithAuthRedirect } from '@features/user/lib';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithAuthRedirect(Login);
