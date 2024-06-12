import type { ReactElement } from 'react';
import { RegistrationForm } from '@/features/user/components';
import { WithAuthRedirect } from '@/features/user/lib';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithAuthRedirect(Registration);
