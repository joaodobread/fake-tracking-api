import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    super(Company, dataSource.manager);
  }

  async findByRef(params: { companyRef: number }) {
    const company = await this.findOne({
      where: {
        companyRef: params.companyRef,
      },
    });
    return company;
  }
}
