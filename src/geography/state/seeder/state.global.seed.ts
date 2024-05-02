import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
// import states from '../../json/states.json'
import { State } from '../../state/entities/state.entity';

@Injectable()
export class StateSeeder implements Seeder {
  name = 'State';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    let newState = [];

    // states.forEach(async (state) => {
    //   newState.push(state);
    // })
    await this.manager.save(State, newState);
  }
}
