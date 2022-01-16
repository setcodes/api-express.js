import { LoggerService } from '../logger/logger.service';
import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILoger) private loggerService: LoggerService) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}
	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
