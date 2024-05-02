import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from '../auth/decorators/require.permissions.decoractor';

@ApiTags('Permissions')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @RequirePermissions('PERMISSION_READ')
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @RequirePermissions('PERMISSION_READ')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }
}
