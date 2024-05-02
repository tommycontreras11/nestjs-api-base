import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
// import countries from '../../json/countries.json'
import { Country } from '../entities/country.entity';

@Injectable()
export class CountrySeeder implements Seeder {
  name = 'Country';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    let newCountry = [];

    // countries.forEach(async (country) => {
    //   newCountry.push(country);
    // })
    await this.manager.save(Country, newCountry);
  }
}
