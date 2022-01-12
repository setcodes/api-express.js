import express, {Express} from "express";
import { UsersController } from "./users/users.controller.js";
import {Server} from 'http';
import {LoggerService} from "./logger/logger.service.js";
import {ExeptionFilter} from "./errors/exeption.filter";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UsersController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: LoggerService,
        userController: UsersController,
        exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter
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
