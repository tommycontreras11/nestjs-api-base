import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
// import cities from '../../json/cities.json'
import { City } from '../../city/entities/city.entity';

@Injectable()
export class CitySeeder implements Seeder {
  name = 'City';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    let newCity = [];
    // cities.forEach(async (city) => {
    //   newCity.push(city);
    // })
    await this.manager.save(City, newCity);
  }
}
