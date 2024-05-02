import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Country } from '../../../geography/country/entities/country.entity';
import { State } from '../../../geography/state/entities/state.entity';

export class CreateCityDto {
  @ApiProperty({ example: 'State 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  country_id: Country;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  state_id: State;
}
