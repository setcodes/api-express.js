import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleweare implements IMiddleware{
	constructor(private classToValidate: ClassConstructor<object>) {
	}
	execute({body}: Request, res: Response, next: NextFunction) {
		const instanse = plainToClass(this.classToValidate, body);
		validate(instanse).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors)
			}else {
				next();
			}
		})
	}
}
