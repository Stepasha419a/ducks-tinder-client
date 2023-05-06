import type { ReactElement } from 'react';
import { LoginForm } from '@features/auth';
import { WithAuthRedirect } from '@features/auth/hocs';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithAuthRedirect(Login);
