import type { ReactElement } from 'react';
import { RegistrationForm } from '@features/RegistrationForm';
import { withPublicHocs } from '@features/withPublicHocs';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default withPublicHocs(Registration);
