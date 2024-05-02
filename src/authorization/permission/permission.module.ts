import { Module, OnModuleInit } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { permissionResource } from './permission';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly model: Repository<Permission>,
  ) {}

  async onModuleInit(): Promise<void> {
    const permissions = permissionResource.getResources();
    await this.insertPermissionsIfNotExist(permissions);
  }

  async insertPermissionsIfNotExist(
    permissions: Partial<Permission>[],
  ): Promise<void> {
    for (const permission of permissions) {
      const existingPermission = await this.model.findOne({
        where: { code_resource: permission.code_resource },
      });

      if (!existingPermission) {
        await this.model.save(permission);
      }
    }
  }
}
