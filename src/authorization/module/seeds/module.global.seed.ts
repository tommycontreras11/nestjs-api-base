import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { ModuleEntity } from '../entities/module.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Injectable()
export class ModuleSeeder implements Seeder {
  name = 'module';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const moduleConfiguration = await this.manager.save(ModuleEntity, [
      {
        name: 'configuration',
        description: 'Module to admin all configuration',
      },
      {
        name: 'User',
        description: 'Module to admin all user',
      },
      {
        name: 'Role',
        description: 'Module to admin all role',
      },
      {
        name: 'Module',
        description: 'Module to admin all module',
      },
      {
        name: 'Permission',
        description: 'Module to admin all permission',
      },
    ]);

    if (moduleConfiguration?.length) {
      await this.createUserModule();
      await this.createRoleModule();
      await this.createPermissionModule();
      await this.createModulePermission();
    }
    console.log(moduleConfiguration);
  }
  async createUserModule() {
    const moduleUser = await this.manager
      .createQueryBuilder(ModuleEntity, 'module')
      .where('module.name = :name', { name: 'user' })
      .getOne();
    if (moduleUser) {
      const permissions = await this.manager
        .createQueryBuilder(Permission, 'permission')
        .where('permission.code_resource IN (:...code_resource)', {
          code_resource: [
            'USER_READ',
            'USER_CREATE',
            'USER_DELETE',
            'USER_UPDATE',
          ],
        })
        .getMany();

      const permissionsInsert = [];
      for (const permission of permissions) {
        permissionsInsert.push({
          module_id: moduleUser.id,
          permission_id: permission.id,
        });
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('module_permission')
        .values(permissionsInsert)
        .execute();
      console.log('module_permission', permissionsInsert);
    }
  }

  async createRoleModule() {
    const roleModule = await this.manager
      .createQueryBuilder(ModuleEntity, 'module')
      .where('module.name = :name', { name: 'role' })
      .getOne();

    if (roleModule) {
      const permissions = await this.manager
        .createQueryBuilder(Permission, 'permission')
        .where('permission.code_resource IN (:...code_resource)', {
          code_resource: [
            'ROLE_READ',
            'ROLE_CREATE',
            'ROLE_DELETE',
            'ROLE_UPDATE',
          ],
        })
        .getMany();

      const permissionsInsert = [];
      for (const permission of permissions) {
        permissionsInsert.push({
          module_id: roleModule.id,
          permission_id: permission.id,
        });
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('module_permission')
        .values(permissionsInsert)
        .execute();
      console.log('module_permission', permissionsInsert);
    }
  }

  async createPermissionModule() {
    const permissionModule = await this.manager
      .createQueryBuilder(ModuleEntity, 'module')
      .where('module.name = :name', { name: 'permission' })
      .getOne();

    if (permissionModule) {
      const permissions = await this.manager
        .createQueryBuilder(Permission, 'permission')
        .where('permission.code_resource IN (:...code_resource)', {
          code_resource: ['PERMISSION_READ'],
        })
        .getMany();

      const permissionsInsert = [];
      for (const permission of permissions) {
        permissionsInsert.push({
          module_id: permissionModule.id,
          permission_id: permission.id,
        });
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('module_permission')
        .values(permissionsInsert)
        .execute();
      console.log('module_permission', permissionsInsert);
    }
  }

  async createModulePermission() {
    const permissionModule = await this.manager
      .createQueryBuilder(ModuleEntity, 'module')
      .where('module.name = :name', { name: 'module' })
      .getOne();

    if (permissionModule) {
      const permissions = await this.manager
        .createQueryBuilder(Permission, 'permission')
        .where('permission.code_resource IN (:...code_resource)', {
          code_resource: [
            'MODULE_READ',
            'MODULE_CREATE',
            'MODULE_DELETE',
            'MODULE_UPDATE',
          ],
        })
        .getMany();

      const permissionsInsert = [];
      for (const permission of permissions) {
        permissionsInsert.push({
          module_id: permissionModule.id,
          permission_id: permission.id,
        });
      }
      await this.manager
        .createQueryBuilder()
        .insert()
        .into('module_permission')
        .values(permissionsInsert)
        .execute();
      console.log('module_permission', permissionsInsert);
    }
  }
}
