import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersService } from './users.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { TYPES } from '../type';
import { UsersService } from './users.service';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

const ConfigServicesMock: IConfigService = {
	get: jest.fn(),
}

const UsersRepository: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
}

const container = new Container();
let configService: IConfigService;
let usersService: IUsersService;
let usersRepository: IUsersRepository;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.UserService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServicesMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepository);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersService = container.get<IUsersService>(TYPES.UserService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
})

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
		(user: User): UserModel => ({
			name: user.name,
			email: user.email,
			password: user.password,
			id: 1
		})

		);
		const createdUser = await usersService.createUser({
			email: 'test@mail.ru',
			name: 'Egor',
			password: '1'
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	})
})
