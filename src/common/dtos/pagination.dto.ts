import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { PaginationParams } from '../../utils/pagination.interface';

export abstract class PaginationDto implements PaginationParams {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'How many rows do you want to skip',
    required: false,
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;
}
