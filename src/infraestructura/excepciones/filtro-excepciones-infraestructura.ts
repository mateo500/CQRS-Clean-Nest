import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Message } from './message';
import { AppLogger } from '../configuracion/ceiba-logger.service';
import { ErrorDeInfraestructura } from '../errores/error-de-infraestructura';

@Catch(ErrorDeInfraestructura)
export class FiltroExcepcionesDeInfraestructura implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(FiltroExcepcionesDeInfraestructura.name);
  }

  catch(error: ErrorDeInfraestructura, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message: Message = {
      statusCode: error.statusCode
        ? error.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: error.message,
    };

    this.logger.customError(error);
    response
      .status(
        error.statusCode ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
      )
      .json(message);
  }
}
