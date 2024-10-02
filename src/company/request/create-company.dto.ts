import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    type: String,
    example: 'https://webhook.site/db91e2cb-00f9-458a-9512-0023ab94035f',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(1024)
  callbackUrl: string;

  @ApiProperty({
    type: String,
    example: 'super_secret',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password: string;

  @ApiProperty({
    type: String,
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  username: string;

  @ApiProperty({
    type: Number,
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  companyRef: number;
}
