import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    type: String,
    example: '4Y1SL65848Z411439',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  vin: string;

  @ApiPropertyOptional({
    type: Number,
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fuelLevel?: number;
}
