import type { ReactElement } from 'react';
import { withAuthHocs } from '@features/hocCompositions';
import { LoginForm } from '@features/LoginForm';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default withAuthHocs(Login);
