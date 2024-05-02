import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Seeder } from 'src/seeder/seeder.interface';

@Injectable()
export class RoleSeeder implements Seeder {
  name = 'Role';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const roles = [
      { name: 'Admin', description: 'Role with all access to resources' },
      { name: 'Users', description: 'Role with basic access to resources' },
    ];

    await this.manager.save(Role, roles);
  }
}
