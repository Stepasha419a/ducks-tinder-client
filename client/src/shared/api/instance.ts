import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import type { AuthResponse } from './services/auth/auth.interfaces';

export const API_URL = 'http://localhost:5000/';

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${
    localStorage.getItem('token') ?? ''
  }`; // access token
  return config;
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
      const response = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem('token', response.data.accessToken);

      return instance.request(originalRequest);
    }
    throw error;
  }
);
