import { DataSource, DataSourceOptions } from 'typeorm';

import { databaseConnection as databaseConnectionConfig } from '../config/config.json';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: databaseConnectionConfig.host,
  port: databaseConnectionConfig.port,
  username: databaseConnectionConfig.username,
  password: databaseConnectionConfig.password,
  database: databaseConnectionConfig.database,
  logging: true,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts']
};

export const AppDataSource: DataSource = new DataSource(dataSourceOptions);
