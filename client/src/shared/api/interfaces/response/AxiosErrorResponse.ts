import type { AxiosError } from 'axios';

export type AxiosErrorResponse = AxiosError<{
  message: string;
  statusCode: number;
}>;
