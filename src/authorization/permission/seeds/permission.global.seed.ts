import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { Permission } from '../entities/permission.entity';
import { permissionResource } from '../permission';

@Injectable()
export class PermissionSeeder implements Seeder {
  name = 'Permission';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const permissions = permissionResource.getResources();

    await this.manager.save(Permission, permissions);
  }
}
