import type { ReactElement } from 'react';
import { LoginForm } from '@features/auth';
import { WithNoAlreadyAuthRedirect } from '@entities/auth/hocs';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default WithNoAlreadyAuthRedirect(Login);
