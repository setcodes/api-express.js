import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import { ILogger } from '../logger/logger.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILoger) private logger: ILogger) {
		const result:  DotenvConfigOutput = config();
		if( result.error) {
			this.logger.error('Не удалось прочитать файл .env или он отсутствует')
		}else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}

}
