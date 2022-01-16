import { NextFunction, Request, Response } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';

export interface IUsersService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	userValidate: (dto: UserLoginDto) => Promise<boolean>;
}
