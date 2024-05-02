import {
  IsOptional,
  IsEmail,
  IsString,
  IsDate,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FilterUserDto extends PaginationDto {

  
  @ApiProperty({
    default: '',
    description: 'Filter by email',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    default: '',
    description: 'Filter by name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    default: '',
    description: 'Filter by start date',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    default: '',
    description: 'Filter by end date',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
