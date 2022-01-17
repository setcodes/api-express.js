import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class ValidateMiddleweare implements IMiddleware{
	execute(req: Request, res: Response, next: NextFunction) {}
}
