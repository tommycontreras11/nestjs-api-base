import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { CountryService } from '../country/country.service';
import { Country } from '../country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State, Country])],
  controllers: [StateController],
  providers: [StateService, CountryService]
})
export class StateModule {}
