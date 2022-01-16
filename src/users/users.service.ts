import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {

	async createUser({name, email, password}: UserRegisterDto): Promise<User | null> {
		const newUser = new User(name, email);
		await newUser.setPassword(password);
		return null;
	}

	async userValidate(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
