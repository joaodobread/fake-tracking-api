import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  providers: [VehicleService],
  exports: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
