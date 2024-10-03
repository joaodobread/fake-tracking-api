import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosError } from 'axios';
import { Agent } from 'https';
import * as pLimit from 'p-limit';
import { EntityManager } from 'typeorm';
import { VehicleRepository } from '../database/repository/vehicle.repository';
import { Tracking } from '../entities/tracking.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleService } from '../vehicle/vehicle.service';

@Injectable()
export class TrackingScheduleTask {
  private readonly limit = pLimit(10);
  private readonly httpsAgent = new Agent({ keepAlive: true });

  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly vehicleService: VehicleService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async execute() {
    const vehicles = await this.vehicleRepository.getVehiclesToSendTracking();
    const vehicleChunks = this.splitArrayIntoChunks(vehicles, 50);

    for (const chunk of vehicleChunks) {
      await this.vehicleRepository.manager.transaction(
        async (entityManager: EntityManager) => {
          const fetchDataArray = await Promise.all(
            chunk.map(async (vehicle) => {
              const newVehicleData = this.vehicleService.updateVehicleTracking({
                vehicle,
              });
              const tracking = await entityManager.findOne(Tracking, {
                where: { id: newVehicleData.lastTrackingId },
              });
              await entityManager.update(Vehicle, vehicle.id, newVehicleData);
              Logger.log(
                `SENDING_TRACKING:${vehicle.id} [${tracking.longitude},${tracking.latitude}]`,
              );
              return {
                callbackUrl: vehicle.company.callbackUrl,
                tracking: {
                  latitude: tracking.latitude,
                  longitude: tracking.longitude,
                  vin: vehicle.vin,
                },
                auth: {
                  username: vehicle.company.username,
                  password: vehicle.company.password,
                },
              };
            }),
          );

          const fetched = await Promise.allSettled(
            fetchDataArray.map(({ callbackUrl, tracking, auth }) =>
              this.limit(() =>
                axios.post(callbackUrl, tracking, {
                  httpsAgent: this.httpsAgent,
                  headers: {
                    Authorization: `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`,
                  },
                }),
              ),
            ),
          );

          fetched
            .filter((p) => p.status === 'rejected')
            .map((p) => p.reason)
            .map((e: AxiosError) => console.log(e.config.url, e.config.data));
        },
      );
    }
  }

  splitArrayIntoChunks(arr: Vehicle[], chunkSize: number = 50): Vehicle[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }
}
