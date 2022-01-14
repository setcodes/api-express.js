import {Request, Response, NextFunction} from "express";
import {LoggerService} from "../logger/logger.service.js";
import {IExeptionFilter} from "./exeption.filter.interface.js";
import {HTTPError} from "./http-error.js";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface.js";
import {TYPES} from "../type.js";
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter{

    constructor(@inject(TYPES.ILoger) private logger: ILogger) {}

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`${err.context} ошибка ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({err: err.message});
        }else {
            this.logger.error(`${err.message}`);
            res.status(500).send({err: err.message});
        }
    }
}
