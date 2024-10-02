import { DataSource } from 'typeorm';
import * as migrations from '../migrations';
import { CompanyRepository } from './repository/company.repository';
import { TrackingRepository } from './repository/tracking.repository';
import { VehicleRepository } from './repository/vehicle.repository';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
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
      });
      return dataSource.initialize();
    },
  },
  TrackingRepository,
  CompanyRepository,
  VehicleRepository,
];
