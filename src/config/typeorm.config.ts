import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigMongodb: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  database: 'taskmanagement',
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
