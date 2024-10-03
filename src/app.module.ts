import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { TrackingScheduleModule } from './tracking-schedule/tracking-schedule.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CompanyModule,
    VehicleModule,
    ScheduleModule.forRoot(),
    TrackingScheduleModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
