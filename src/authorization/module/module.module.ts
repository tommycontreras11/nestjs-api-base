import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, Permission])],
  controllers: [ModuleController],
  providers: [ModuleService, PermissionService]
})
export class ModuleModule {}
