import { WithCheckedFields } from '@features/setting/hocs';
import { WithAuthRedirect } from '@features/auth/hocs';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(WithAuthRedirect, WithCheckedFields);
