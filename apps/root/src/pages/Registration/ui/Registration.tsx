import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/RegistrationForm';
import { WithHocSubscription, authHocComposition } from '@shared/lib';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default WithHocSubscription(authHocComposition, Registration);
