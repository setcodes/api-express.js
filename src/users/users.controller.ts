import {LoggerService} from "../logger/logger.service.js";
import {BaseController} from "../common/base.controller.js";
import {Request, Response, NextFunction} from "express";
import {HTTPError} from "../errors/http-error.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../type.js";
import 'reflect-metadata';
import {IUsersController} from "./users.controller.interface";

@injectable()
export class UsersController  extends BaseController implements IUsersController{

    constructor(@inject(TYPES.ILoger) private loggerService: LoggerService) {
        super(loggerService);
        this.bindRoutes([
            { path: "/login", method: "post", func: this.login },
            { path: "/register", method: "post", func: this.register },
        ])
    }
    login (req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "ошибка авторизации", "login"));
    }

    register (req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}
