import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

import type { AuthResponse } from '@shared/api';

interface AxiosEditedConfig extends AxiosResponse {
  _isRetry?: boolean;
}
export function setUpInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem('accessToken')!;
    return config;
  });

  instance.interceptors.response.use(
    (config: AxiosEditedConfig) => config,
    async (error: AxiosError<{ message: string; status: string }>) => {
      const originalRequest = error.config as AxiosEditedConfig;
      if (error.config?.url?.endsWith('/auth/refresh')) {
        throw error;
      }

      if (
        error.response?.status === 401 &&
        !(error.config as AxiosEditedConfig)._isRetry
      ) {
        originalRequest._isRetry = true;
        const response = await axios.get<AuthResponse>(
          `${process.env.VITE_AUTH_SERVICE_URL}/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('accessToken', response.data.accessToken);

        return instance.request(originalRequest);
      }
      throw error;
    }
  );
}
