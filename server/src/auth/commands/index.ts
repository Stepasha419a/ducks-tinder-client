export { RegisterCommand } from './register';
export { LoginCommand } from './login';
export { LogoutCommand } from './logout';

import { RegisterHandler } from './register';
import { LoginHandler } from './login';
import { LogoutHandler } from './logout';

export const AuthCommandHandlers = [
  RegisterHandler,
  LoginHandler,
  LogoutHandler,
];
