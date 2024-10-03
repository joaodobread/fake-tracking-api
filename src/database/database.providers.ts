import 'dotenv/config';

import { DataSource } from 'typeorm';
import * as migrations from '../migrations';
import { CompanyRepository } from './repository/company.repository';
import { TrackingRepository } from './repository/tracking.repository';
import { VehicleRepository } from './repository/vehicle.repository';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const databaseHost = process.env.DATABASE_HOST;
      const databaseUser = process.env.DATABASE_USER;
      const databasePassword = process.env.DATABASE_PASSWORD;
      const databasePort = Number(process.env.DATABASE_PORT);
      const databaseName = process.env.DATABASE_NAME;

      const dataSource = new DataSource({
        type: 'mysql',
        host: databaseHost,
        port: databasePort,
        username: databaseUser,
        password: databasePassword,
        database: databaseName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        multipleStatements: true,
        migrations,
        migrationsRun: true,
      });
      return dataSource.initialize();
    },
  },
  TrackingRepository,
  CompanyRepository,
  VehicleRepository,
];
