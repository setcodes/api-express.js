import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service.js";
import {UsersController} from "./users/users.controller.js";
import {ExeptionFilter} from "./errors/exeption.filter.js";

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UsersController(logger), new ExeptionFilter(logger));
    await app.init();
}
bootstrap();
