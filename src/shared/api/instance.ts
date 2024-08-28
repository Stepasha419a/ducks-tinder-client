import axios from 'axios';
import { setUpInterceptors } from './interceptors';

export const instance = axios.create({
  withCredentials: true,
});

setUpInterceptors(instance);
