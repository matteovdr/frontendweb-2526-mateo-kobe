import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, Logger } from '@nestjs/common';
import type { Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  details?: object | null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responseBody: HttpExceptionResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      details: null,
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        typeof exceptionResponse.message === 'string'
      ) {
        responseBody.message = exceptionResponse.message; // we nemen de custom message over ipv de basis error message
      }

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'details' in exceptionResponse &&
        typeof exceptionResponse.details === 'object'
      ) {
        responseBody.details = exceptionResponse.details;
      }
    }

    // Logging-formatter gemaakt door Mauro Clement, gebruikt met toestemming
    function responseFormatter(object: object, layer: number = 0): string {
      return Object.entries(object)
        .map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const newValue = responseFormatter(value, layer + 1); // Ge zijt een object whether you like it or not
            return '\t'.repeat(layer) + `${key}:\n` + `${newValue}`;
          }
          return value ? '\t'.repeat(layer) + `${key} - ${value}` : '';
        })
        .join('\n');
    }

    // Log hem
    new Logger('HttpExceptionFilter').error(
      // `HTTP Exception: ${JSON.stringify(responseBody)}`,
      `HTTP Exception!\n\n` +
        `Details:\n` +
        `${responseFormatter(responseBody)}`,
    );
    response.status(status).json(responseBody);
  }
}
