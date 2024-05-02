import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'País 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'PAI' })
  @IsString()
  @IsNotEmpty()
  iso3: string;

  @ApiProperty({ example: 'PA' })
  @IsString()
  @IsNotEmpty()
  iso2: string;

  @ApiProperty({ example: 'Palmas' })
  @IsString()
  @IsNotEmpty()
  capital: string;

  @ApiProperty({ example: 'Asia' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ example: 'Southern Asia' })
  @IsString()
  @IsNotEmpty()
  subregion: string;
}
