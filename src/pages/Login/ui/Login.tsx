import type { ReactElement } from 'react';
import { LoginForm } from '@features/LoginForm';
import { withPublicHocs } from '@features/withPublicHocs';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default withPublicHocs(Login);
