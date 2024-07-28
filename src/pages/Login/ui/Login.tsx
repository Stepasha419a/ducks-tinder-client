import type { ReactElement } from 'react';
import { withPublicPageHocs } from '@widgets/pagesLib';
import { LoginForm } from '@features/LoginForm';

const Login = (): ReactElement => {
  return <LoginForm />;
};

export default withPublicPageHocs(Login);
