import { DataSource } from 'typeorm';

import { getErrorResponse } from '../../utils/getErrorResponse';
import { getResponse } from '../../utils/getResponse';

export const databaseConnectionTest = async () => {
  try {
    const appDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true
    });
    await appDataSource.initialize();

    const result = await appDataSource.query('SELECT * FROM Words');

    await appDataSource.destroy();

    return getResponse(200, result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
