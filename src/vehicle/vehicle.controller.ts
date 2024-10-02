import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from './request/create-vehicle.dto';
import { VehicleService } from './vehicle.service';

@ApiSecurity('X-Api-Key')
@Controller('vehicles')
@ApiTags('Vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async createVehicle(
    @Body() body: CreateVehicleDto,
    @Query('companyRef', ParseIntPipe) companyRef: number,
  ) {
    const vehicle = await this.vehicleService.create({
      ...body,
      companyRef,
    });
    return vehicle;
  }

  @Delete(':vin')
  async deleteVehicle(
    @Param('vin') vin: string,
    @Query('companyRef', ParseIntPipe) companyRef: number,
  ) {
    await this.vehicleService.deactivateVehicle({
      companyRef,
      vin,
    });
  }
}
