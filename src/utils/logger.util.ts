/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  /**
   * Write a 'log' level log.
   */ log(_message: any, ..._optionalParams: any[]) {}

  /**
   * Write an 'error' level log.
   */ error(_message: any, ..._optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */ warn(_message: any, ..._optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */ debug?(_message: any, ..._optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */ verbose?(_message: any, ..._optionalParams: any[]) {}
}