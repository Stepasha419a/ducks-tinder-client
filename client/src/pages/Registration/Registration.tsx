import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/auth';
import { WithAuthRedirect } from '@features/auth/hocs';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithAuthRedirect(Registration);
