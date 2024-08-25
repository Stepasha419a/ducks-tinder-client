import type { ReactElement } from 'react';
import { withAuthHocs } from '@features/hocCompositions';
import { RegistrationForm } from '@features/RegistrationForm';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default withAuthHocs(Registration);
