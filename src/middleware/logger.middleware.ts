
import { Injectable } from '@nestjs/common';
import { Request, Response } from '@nestjs/common';
@Injectable()
export class LoggerMiddleware {
  use(req:Request, res:Response, next) {
    console.log('Request...  Middleware .......... ');
    next();
  }
}
