import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [DatabaseModule, CompanyModule, VehicleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
