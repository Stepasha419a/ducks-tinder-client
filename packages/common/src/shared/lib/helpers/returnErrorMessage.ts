import axios from 'axios';

export function returnErrorMessage(error: unknown): string {
  if (error instanceof Error || axios.isAxiosError(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'undefined error';
}
