import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';

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

instance.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);

      return instance.request(originalRequest);
    }
    throw error;
  },
);
