export { RegisterCommand } from './register';
export { LoginCommand } from './login';

import { RegisterHandler } from './register';
import { LoginHandler } from './login';

export const AuthCommandHandlers = [RegisterHandler, LoginHandler];
