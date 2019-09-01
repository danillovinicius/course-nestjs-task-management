import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfigMongodb: TypeOrmModuleOptions = {
  type: dbConfig.get('type'),
  host: process.env.APP_HOSTNAME || dbConfig.get('host'),
  port: process.env.APP_PORT || dbConfig.get('port'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  database: process.env.APP_DATABASE || dbConfig.get('database'),
  synchronize: true,
  useNewUrlParser: true,
  logging: true,
};

export const typeOrmConfigMysql: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: { insecureAuth: true },
};
