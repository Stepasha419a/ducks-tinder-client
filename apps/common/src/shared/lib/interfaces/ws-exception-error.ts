export interface WsExceptionError {
  error: {
    message: string;
    statusCode: number;
  };
  message: string;
}
