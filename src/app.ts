import express, {Express} from "express";
import {UsersController} from "./users/users.controller.js";
import {Server} from 'http';
import {ExeptionFilter} from "./errors/exeption.filter.js";
import {ILogger} from "./logger/logger.interface.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./type.js";
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
       @inject(TYPES.ILoger) private logger: ILogger,
       @inject(TYPES.UserController) private userController: UsersController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }

    useExeptionFilters() {
       this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started https://localhost:${this.port}`);
    }
}
