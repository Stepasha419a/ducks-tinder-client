import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { User } from './interfaces';

export const API_URL = 'http://localhost:5000/';

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

interface AxiosEditedConfig extends AxiosResponse {
  _isRetry?: boolean;
}

instance.interceptors.response.use(
  (config: AxiosEditedConfig) => config,
  async (error: AxiosError<{ message: string; status: string }>) => {
    const originalRequest = error.config as AxiosEditedConfig;
    if (
      error.response?.status === 401 &&
      !(error.config as AxiosEditedConfig)._isRetry
    ) {
      originalRequest._isRetry = true;
      await axios.get<User>(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });

      return instance.request(originalRequest);
    }
    throw error;
  }
);
