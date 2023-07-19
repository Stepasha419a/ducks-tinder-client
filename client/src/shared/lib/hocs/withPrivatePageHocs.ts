import { WithCheckedFields } from '@features/setting/lib';
import { WithAuthRedirect } from '@features/auth/lib';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(WithAuthRedirect, WithCheckedFields);
