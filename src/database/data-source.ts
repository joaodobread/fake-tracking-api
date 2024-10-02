import { DataSource } from 'typeorm';
import * as migrations from '../migrations';

console.log('aq');

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'vehicle_notification',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  multipleStatements: true,
  migrations,
  migrationsRun: true,
  logging: true,
});
