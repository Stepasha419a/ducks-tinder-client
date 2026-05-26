import type { Preview } from '@storybook/react';
import '@ducks-tinder-client/ui/dist/cjs/index.css';
import { setCommonLibSettings } from '@ducks-tinder-client/common';

document.querySelector('html')!.dataset.theme = 'light';

setCommonLibSettings({
  CLIENT_ROOT_URL: '',
  AUTH_SERVICE_URL: 'https://localhost/auth-service-url',
  CHAT_SERVICE_URL: '',
  CHAT_SERVICE_SOCKET_PATH: '',
  FILE_SERVICE_URL: '',
  USER_SERVICE_URL: 'https://localhost/user-service-url',
  WITH_MOCKS: false,
  TEXTS: {
    reconnection:
      'Something went wrong during the initial check. Trying to reconnect...',
    successConnect: 'Successful connection',
    incorrectEmailOrPassword: 'Incorrect email or password',
    unauthorized: 'Unauthorized',
    userAlreadyExists: 'User already exists',
    errorOccurred:
      'Some error occurred! The view is blocked to prevent an error.',
    redirection: 'You will be redirected in 10 seconds.',
    clickToStay: 'Click here to stay',
    redirectionCancelled: 'Redirection canceled!',
    auth: {
      create: 'Create your Account',
      memberLogin: 'Member Login',
      login: 'Login',
      loginAccount: 'Log in your Account',
      memberSignUp: 'Member Sign Up',
      signUp: 'Sign up',
      email: 'Email',
      emailRequired: 'Email is required',
      emailIncorrect: 'Incorrect email',
      getEmailLengthMax: () => 'Email must be less than {{count}} symbols',
      password: 'Password',
      passwordRequired: 'Password is required',
      getPasswordLengthMin: () =>
        'Password must be more than {{count}} symbols',
      getPasswordLengthMax: () =>
        'Password must be less than {{count}} symbols',
      name: 'First name',
      nameRequired: 'Name is required',
      getNameLengthMin: () => 'Name must be more than {{count}} symbols',
      getNameLengthMax: () => 'Name must be less than {{count}} symbols',
      reconnection:
        'Something went wrong during the initial check. Trying to reconnect...',
      successConnect: 'Successful connection',
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
