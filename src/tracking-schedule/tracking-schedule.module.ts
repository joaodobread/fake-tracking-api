import { Module } from '@nestjs/common';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ScheduleController } from './scheduler.controller';
import { TrackingScheduleTask } from './tracking-schedule.task';

@Module({
  imports: [VehicleModule],
  controllers: [ScheduleController],
  providers: [TrackingScheduleTask],
})
export class TrackingScheduleModule {}
