export interface CommonLibSettings {
  CLIENT_ROOT_URL: string;
  AUTH_SERVICE_URL: string;
  CHAT_SERVICE_URL: string;
  CHAT_SERVICE_SOCKET_PATH: string;
  FILE_SERVICE_URL: string;
  USER_SERVICE_URL: string;
  WITH_MOCKS: boolean;
  TEXTS: {
    reconnection: string;
    successConnect: string;
    incorrectEmailOrPassword: string;
    unauthorized: string;
    userAlreadyExists: string;
    errorOccurred: string;
    redirection: string;
    clickToStay: string;
    redirectionCancelled: string;
    auth: {
      create: string;
      memberLogin: string;
      login: string;
      loginAccount: string;
      memberSignUp: string;
      signUp: string;
      email: string;
      emailRequired: string;
      emailIncorrect: string;
      getEmailLengthMax: (count: number) => string;
      password: string;
      passwordRequired: string;
      getPasswordLengthMin: (count: number) => string;
      getPasswordLengthMax: (count: number) => string;
      name: string;
      nameRequired: string;
      getNameLengthMin: (count: number) => string;
      getNameLengthMax: (count: number) => string;
      reconnection: string;
      successConnect: string;
    };
  };
}

export const COMMON_LIB_SETTINGS: CommonLibSettings = {
  CLIENT_ROOT_URL: '',
  AUTH_SERVICE_URL: '',
  CHAT_SERVICE_URL: '',
  CHAT_SERVICE_SOCKET_PATH: '',
  FILE_SERVICE_URL: '',
  USER_SERVICE_URL: '',
  WITH_MOCKS: false,
  TEXTS: {
    reconnection: '',
    successConnect: '',
    incorrectEmailOrPassword: '',
    unauthorized: '',
    userAlreadyExists: '',
    errorOccurred: '',
    redirection: '',
    clickToStay: '',
    redirectionCancelled: '',
    auth: {
      create: '',
      memberLogin: '',
      login: '',
      loginAccount: '',
      memberSignUp: '',
      signUp: '',
      email: '',
      emailRequired: '',
      emailIncorrect: '',
      getEmailLengthMax: () => '',
      password: '',
      passwordRequired: '',
      getPasswordLengthMin: () => '',
      getPasswordLengthMax: () => '',
      name: '',
      nameRequired: '',
      getNameLengthMin: () => '',
      getNameLengthMax: () => '',
      reconnection: '',
      successConnect: '',
    },
  },
};
