import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/auth';
import { WithNoAlreadyAuthRedirect } from '@entities/auth/hocs';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithNoAlreadyAuthRedirect(Registration);
