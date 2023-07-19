import type { AxiosError } from 'axios';
import axios from 'axios';

export type AxiosErrorResponse = AxiosError<{
  message: string;
  statusCode: number;
}>;

export function returnErrorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? (error as AxiosErrorResponse).response!.data.message
    : (error as Error).message;
}
