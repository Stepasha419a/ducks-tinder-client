import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { AuthResponse } from './services/auth/auth.interfaces';

export const instance = axios.create({
  withCredentials: true,
});

interface AxiosEditedConfig extends AxiosResponse {
  _isRetry?: boolean;
}

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization =
    'Bearer ' + localStorage.getItem('accessToken')!;
  return config;
});

instance.interceptors.response.use(
  (config: AxiosEditedConfig) => config,
  async (error: AxiosError<{ message: string; status: string }>) => {
    const originalRequest = error.config as AxiosEditedConfig;
    if (
      error.response?.status === 401 &&
      !(error.config as AxiosEditedConfig)._isRetry
    ) {
      originalRequest._isRetry = true;
      const response = await axios.get<AuthResponse>(
        `${process.env.USER_SERVICE_URL!}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken.value);

      return instance.request(originalRequest);
    }
    throw error;
  }
);
