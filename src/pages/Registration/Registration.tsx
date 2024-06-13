import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/user';
import { WithAuthRedirect } from '@features/user';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithAuthRedirect(Registration);
