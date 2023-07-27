import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(HttpException)
export class WsHttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();

    let errorMessage: string | object = 'Internal server error';
    if (typeof exception.getResponse === 'function') {
      errorMessage = exception.getResponse();
    }

    const wsException = new WsException(errorMessage);
    client.emit('exception', wsException);
  }
}
