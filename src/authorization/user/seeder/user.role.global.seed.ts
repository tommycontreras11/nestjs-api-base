import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { Role } from '../../role/entities/role.entity';

@Injectable()
export class UserRoleSeeder implements Seeder {
  name = 'user_roles';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const roles = await this.manager
      .createQueryBuilder(Role, 'user_roles')
      .getMany();

    for (const role of roles) {
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('user_roles')
        .values({
          usersId: 1,
          rolesId: role.id,
        })
        .execute();
    }
  }
}
