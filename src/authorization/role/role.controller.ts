import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDuplicateRoleDto } from './dto/create-duplicate-role.dto';
import { RequirePermissions } from '../auth/decorators/require.permissions.decoractor';
import { AddRoleModuleDto } from './dto/add-role-module.dto';
import { RemoveRoleModuleDto } from './dto/remove-role-module.dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @RequirePermissions('ROLE_CREATE')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @RequirePermissions('ROLE_CREATE')
  @Post('duplicate')
  duplicate(@Body() createDuplicateRoleDto: CreateDuplicateRoleDto) {
    return this.roleService.duplicate(createDuplicateRoleDto);
  }

  @RequirePermissions('ROLE_CREATE')
  @Post('add-module')
  addRoleModule(@Body() addRoleModuleDto: AddRoleModuleDto) {
    return this.roleService.addRoleModule(addRoleModuleDto);
  }

  @RequirePermissions('ROLE_DELETE')
  @Post('remove-module')
  removeRoleModule(@Body() removeRoleModuleDto: RemoveRoleModuleDto) {
    return this.roleService.removeRoleModule(removeRoleModuleDto);
  }

  @RequirePermissions('ROLE_READ')
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @RequirePermissions('ROLE_READ')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @RequirePermissions('ROLE_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @RequirePermissions('ROLE_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
