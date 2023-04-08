import axios from 'axios';
import type { AxiosErrorResponse } from '../api/interfaces';

export function returnErrorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? (error as AxiosErrorResponse).response!.data.message
    : (error as Error).message;
}
