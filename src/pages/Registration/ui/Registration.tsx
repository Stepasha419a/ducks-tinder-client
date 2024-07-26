import type { ReactElement } from 'react';
import { withPublicPageHocs } from '@widgets/pagesLib';
import { RegistrationForm } from '@features/user';

const Registration = (): ReactElement => {
  return <RegistrationForm />;
};

export default withPublicPageHocs(Registration);
