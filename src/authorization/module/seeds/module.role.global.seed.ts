import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { ModuleEntity } from '../entities/module.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Injectable()
export class ModuleRoleSeeder implements Seeder {
  name = 'ModuleRole';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const permission = await this.manager
      .createQueryBuilder(Permission, 'role')
      .take(2)
      .getMany();

    const moduleEntities = await this.manager
      .createQueryBuilder(ModuleEntity, 'module')
      .take(2)
      .getMany();

    if (
      permission.length == moduleEntities.length &&
      moduleEntities.length > 0
    ) {
      const moduleRoles = [
        {
          permission_id: +permission[0]['id'],
          module_id: moduleEntities[0]['id'],
        },
        {
          permission_id: +permission[1]['id'],
          module_id: moduleEntities[1]['id'],
        },
      ];
      console.log('moduleRoles', moduleRoles);
      // await this.manager.save('permission_module', moduleRoles);
    }
  }
}
