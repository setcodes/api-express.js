import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './type';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import 'reflect-metadata';

export interface IBootstrap {
	appContainer: Container;
	app: App;
}


export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILoger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<UsersController>(TYPES.UserController).to(UsersController);
	bind<App>(TYPES.Aplication).to(App);
});

function bootstrap(): IBootstrap {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Aplication);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
