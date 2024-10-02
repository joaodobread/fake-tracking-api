import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './request/create-company.dto';

@Controller('companies')
@ApiSecurity('X-Api-Key')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyDto) {
    const company = await this.companyService.create(body);
    return company;
  }

  @Delete(':companyRef')
  async deleteCompany(@Param('companyRef', ParseIntPipe) companyRef: number) {
    const company = await this.companyService.deleteCompany({ companyRef });
    return company;
  }
}
