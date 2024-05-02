import { ModuleEntity } from 'src/Authorization/module/entities/module.entity';
import { Permission } from '../permission.interface';

export class CreatePermissionModuleDto {
    module_id: ModuleEntity;
    permission_id: Permission;
}