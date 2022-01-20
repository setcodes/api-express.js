import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async createUser({name, email, password}: UserRegisterDto): Promise<User | null> {
		const newUser = new User(name, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	}

	async userValidate(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
