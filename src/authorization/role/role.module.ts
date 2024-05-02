import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ModuleService } from '../module/module.service';
import { ModuleEntity } from '../module/entities/module.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, ModuleEntity, Permission])],
  controllers: [RoleController],
  providers: [RoleService, ModuleService, PermissionService],
  exports: [RoleService],
})
export class RoleModule {}
