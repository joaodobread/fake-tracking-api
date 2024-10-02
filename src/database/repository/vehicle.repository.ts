import { Inject, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { Vehicle } from '../../entities/vehicle.entity';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(Vehicle, dataSource.manager);
  }

  async getByCompanyAndVin(params: { companyRef: number; vin: string }) {
    const vehicle = this.createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.company', 'company')
      .where('company.companyRef = :companyRef', {
        companyRef: params.companyRef,
      })
      .andWhere('vehicle.vin = :vin', { vin: params.vin })
      .getOne();
    return vehicle;
  }

  async getVehiclesToSendTracking() {
    const queryBuilder = this.createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.company', 'company')
      .where('vehicle.active = true')
      .andWhere('company.active = true')
      .andWhere(
        new Brackets((qb) =>
          qb
            .orWhere('vehicle.nextProcessingDate <= :nextProcessingDate', {
              nextProcessingDate: new Date(),
            })
            .orWhere('vehicle.nextProcessingDate IS NULL'),
        ),
      );
    return queryBuilder.getMany();
  }
}
