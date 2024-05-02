import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDuplicateModuleDto } from './dto/create-duplicate-module.dto';
import { RequirePermissions } from '../auth/decorators/require.permissions.decoractor';
import { AddModulePermissionDto } from './dto/add-module-permission.dto';
import { RemoveModulePermissionDto } from './dto/remove-module-permission.dto';

@ApiTags('Modules')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @RequirePermissions('MODULE_CREATE')
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @RequirePermissions('MODULE_CREATE')
  @Post('duplicate')
  duplicate(@Body() createDuplicateModuleDto: CreateDuplicateModuleDto) {
    return this.moduleService.duplicate(createDuplicateModuleDto);
  }

  @RequirePermissions('MODULE_CREATE')
  @Post('add-permission')
  addModulePermission(@Body() addModulePermissionDto: AddModulePermissionDto) {
    return this.moduleService.addModulePermission(addModulePermissionDto);
  }

  @RequirePermissions('MODULE_CREATE')
  @Post('remove-permission')
  removeModulePermission(@Body() removeModulePermissionDto: RemoveModulePermissionDto) {
    return this.moduleService.removeModulePermission(removeModulePermissionDto);
  }

  @RequirePermissions('MODULE_READ')
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @RequirePermissions('MODULE_READ')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  @RequirePermissions('MODULE_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(+id, updateModuleDto);
  }

  @RequirePermissions('MODULE_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(+id);
  }
}
