import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Country } from "../../../geography/country/entities/country.entity";

export class CreateStateDto {
  @ApiProperty({ example: 'State 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '67' })
  @IsString()
  @IsNotEmpty()
  iso2: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  country_id: Country;
}
