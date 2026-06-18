import type { User } from '@ducks-tinder-client/common';
import type { AxiosResponse } from 'axios';

export type UserGetMeEndpoint = () => Promise<AxiosResponse<User>>;
