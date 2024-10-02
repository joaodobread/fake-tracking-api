import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../database/repository/company.repository';
import { TrackingRepository } from '../database/repository/tracking.repository';
import { VehicleRepository } from '../database/repository/vehicle.repository';

@Injectable()
export class VehicleService {
  private readonly MAX_UPPER_TRACKING = 21951;

  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly trackingRepository: TrackingRepository,
  ) {}

  async create(params: {
    companyRef: number;
    vin: string;
    fuelLevel?: number;
  }) {
    const company = await this.companyRepository.findByRef({
      companyRef: params.companyRef,
    });
    if (!company) {
      throw new NotFoundException('exception:COMPANY_NOT_FOUND');
    }
    const initialTrackingId =
      await this.trackingRepository.getRandomStartPoint();
    let vehicle = await this.vehicleRepository.getByCompanyAndVin({
      companyRef: params.companyRef,
      vin: params.vin,
    });
    if (vehicle && vehicle.active) {
      throw new ConflictException('exception:VEHICLE_ALREADY_EXISTS');
    }
    if (vehicle && !vehicle.active) {
      await this.vehicleRepository.update(vehicle.id, {
        active: true,
        lastTrackingId: initialTrackingId,
        lastFuelLevel: params.fuelLevel ?? 100,
      });
      vehicle = await this.vehicleRepository.findOne({
        where: { id: vehicle.id },
      });
      return vehicle;
    }
    vehicle = this.vehicleRepository.create({
      companyId: company.id,
      vin: params.vin,
      lastTrackingId: initialTrackingId,
      lastFuelLevel: params.fuelLevel ?? 100,
    });
    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }

  async deactivateVehicle(params: { companyRef: number; vin: string }) {
    const company = await this.companyRepository.findByRef({
      companyRef: params.companyRef,
    });
    if (!company) {
      throw new NotFoundException('exception:COMPANY_NOT_FOUND');
    }
    const vehicle = await this.vehicleRepository.getByCompanyAndVin({
      companyRef: params.companyRef,
      vin: params.vin,
    });
    if (!vehicle) {
      throw new NotFoundException('exception:VEHICLE_NOT_FOUND');
    }
    await this.vehicleRepository.update(vehicle.id, { active: false });
  }

  async updateVehicleTracking(params: { vehicleId: number }) {
    let vehicle = await this.vehicleRepository.findOne({
      where: { id: params.vehicleId },
    });
    if (!vehicle) {
      return;
    }
    let nextTrackingId = (vehicle.lastFuelLevel + 1) % this.MAX_UPPER_TRACKING;
    if (!nextTrackingId) {
      nextTrackingId = 1;
    }
    await this.vehicleRepository.update(vehicle.id, {
      lastFuelLevel: this.getRandomFuelLevel({ max: 100, min: 10 }),
      lastTrackingId: nextTrackingId,
      nextProcessingDate: this.getRandomFutureDate({
        maxSeconds: 30 * 60,
        minSeconds: 10,
      }),
    });
    vehicle = await this.vehicleRepository.findOne({
      where: { id: params.vehicleId },
    });
    return vehicle;
  }

  getRandomFuelLevel({ min, max }: { min: number; max: number }) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomFutureDate({
    minSeconds,
    maxSeconds,
  }: {
    minSeconds: number;
    maxSeconds: number;
  }) {
    const now = new Date();
    const randomSeconds =
      Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
    const futureTime = now.getTime() + randomSeconds * 1000;
    return new Date(futureTime);
  }
}
