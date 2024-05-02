import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { ModuleEntity } from '../../module/entities/module.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleModuleSeeder implements Seeder {
  name = 'RoleModule';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    await this.createRoleModuleAdmin();
    await this.createRoleModuleUser();
  }

  async createRoleModuleAdmin() {
    const modules = await this.manager
    .createQueryBuilder(ModuleEntity, 'module')
    .where('module.name IN (:...name)', {
      name: [
        'configuration',
        'User',
        'Role',
        'Module',
        'Permission',
      ],
    })
    .getMany();

    const roleAdmin = await this.manager
      .createQueryBuilder(Role, 'role')
      .where('role.name = :name', { name: 'Admin' })
      .getOne();
    if (modules) {
      const role_module = [];
      for (const module of modules) {
        role_module.push({
          role_id: roleAdmin.id,
          module_id: module.id
        })
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('role_module')
        .values(role_module)
        .execute();
    }
  }

  async createRoleModuleUser() {
    const modules = await this.manager
    .createQueryBuilder(ModuleEntity, 'module')
    .where('module.name IN (:...name)', {
      name: [
        'User'
      ],
    })
    .getMany();

    const roleAdmin = await this.manager
      .createQueryBuilder(Role, 'role')
      .where('role.name = :name', { name: 'Users' })
      .getOne();
    if (modules) {
      const role_module = [];
      for (const module of modules) {
        role_module.push({
          role_id: roleAdmin.id,
          module_id: module.id
        })
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('role_module')
        .values(role_module)
        .execute();
    }
  }
}
