import type { ReactElement } from 'react';
import { WithAuthRedirect } from '@features/user/lib';
import { RegistrationForm } from '@features/user/ui';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithAuthRedirect(Registration);
