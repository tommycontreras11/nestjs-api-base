import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { State } from '../state/entities/state.entity';
import { Country } from '../country/entities/country.entity';
import { StateService } from '../state/state.service';
import { CountryService } from '../country/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, State, Country])],
  controllers: [CityController],
  providers: [CityService, StateService, CountryService]
})
export class CityModule {}
