export { RegisterCommand } from './register';
export { LoginCommand } from './login';
export { LogoutCommand } from './logout';
export { RefreshCommand } from './refresh';

import { RegisterHandler } from './register';
import { LoginHandler } from './login';
import { LogoutHandler } from './logout';
import { RefreshHandler } from './refresh';

export const AuthCommandHandlers = [
  RegisterHandler,
  LoginHandler,
  LogoutHandler,
  RefreshHandler,
];
