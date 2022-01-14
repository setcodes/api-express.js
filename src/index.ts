import {App} from "./app.js";
import {LoggerService} from "./logger/logger.service.js";
import {UsersController} from "./users/users.controller.js";
import {ExeptionFilter} from "./errors/exeption.filter.js";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface.js";
import {TYPES} from "./type.js";
import {IExeptionFilter} from "./errors/exeption.filter.interface.js";
import 'reflect-metadata';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILoger).to(LoggerService);
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
    bind<UsersController>(TYPES.UserController).to(UsersController);
    bind<App>(TYPES.Aplication).to(App);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBinding);
    const app = appContainer.get<App>(TYPES.Aplication);
    app.init();
    return {app, appContainer}
}

export const {app, appContainer} = bootstrap();

