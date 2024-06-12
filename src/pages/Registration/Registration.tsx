import type { ReactElement } from 'react';
import { RegistrationForm } from '@/features/user/ui';
import { WithAuthRedirect } from '@/features/user/lib';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithAuthRedirect(Registration);
