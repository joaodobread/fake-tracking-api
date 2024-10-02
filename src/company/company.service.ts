import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CompanyRepository } from '../database/repository/company.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(params: {
    callbackUrl: string;
    password: string;
    username: string;
    companyRef: number;
  }) {
    let company = await this.companyRepository.findOne({
      where: {
        companyRef: params.companyRef,
      },
    });
    if (company && company.active) {
      throw new ConflictException('exception:COMPANY_ALREADY_EXISTS');
    }
    if (company && !company.active) {
      await this.companyRepository.update(company.id, { active: true });
      company = await this.companyRepository.findOne({
        where: { id: company.id },
      });
      return company;
    }
    company = this.companyRepository.create({
      active: true,
      callbackUrl: params.callbackUrl,
      password: params.password,
      username: params.username,
      companyRef: params.companyRef,
    });
    await this.companyRepository.save(company, { reload: true });
  }

  async deleteCompany(params: { companyRef: number }) {
    const company = await this.companyRepository.findOne({
      where: {
        companyRef: params.companyRef,
      },
    });

    if (!company) {
      throw new NotFoundException('exception:COMPANY_NOT_FOUND');
    }

    await this.companyRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        await entityManager.update(Company, company.id, { active: false });
        await entityManager.query(
          `UPDATE vehicles SET active=0 WHERE company_id = ?`,
          [company.id],
        );
      },
    );
  }
}
