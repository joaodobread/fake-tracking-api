import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { TrackingScheduleModule } from './tracking-schedule/tracking-schedule.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
    VehicleModule,
    ScheduleModule.forRoot(),
    TrackingScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
