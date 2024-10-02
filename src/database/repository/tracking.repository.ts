import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tracking } from '../../entities/tracking.entity';

@Injectable()
export class TrackingRepository extends Repository<Tracking> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(Tracking, dataSource.manager);
  }

  async getRandomStartPoint(): Promise<number> {
    const [{ id }]: [{ id: number }] = await this.query(
      `select id from tracking order by rand() limit 1;`,
    );
    return id;
  }
}
