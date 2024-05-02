import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateDuplicateModuleDto } from './dto/create-duplicate-module.dto';
import { AddModulePermissionDto } from './dto/add-module-permission.dto';
import { PermissionService } from '../permission/permission.service';
import { RemoveModulePermissionDto } from './dto/remove-module-permission.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly model: Repository<ModuleEntity>,
    private readonly permissionService: PermissionService,
    private readonly manager: EntityManager,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    const module = this.model.create(createModuleDto);
    await this.model.save(module);
    return module;
  }

  async duplicate(createDuplicateModuleDto: CreateDuplicateModuleDto) {
    const modules = await this.model.findOne({
      where: { id: createDuplicateModuleDto.id },
      relations: { permissions: true },
      select: {
        permissions: {
          id: true,
        },
      },
    });

    if (!modules) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${createDuplicateModuleDto.id}. Please try again with a valid ID`,
      );
    }

    const newModule = this.model.create({
      name: createDuplicateModuleDto.name,
      description: createDuplicateModuleDto.description,
    });

    const moduleCreated = await this.model.save(newModule);

    const module_permission = modules.permissions.map((permission) => {
      return {
        module_id: moduleCreated.id,
        permission_id: permission.id,
      };
    });

    await this.manager
      .createQueryBuilder()
      .insert()
      .into('module_permission')
      .values(module_permission)
      .execute();

    return await this.findOne(moduleCreated.id);
  }

  async addModulePermission(addModulePermissionDto: AddModulePermissionDto) {
    const findModule = await this.findOne(addModulePermissionDto.module_id);
    if (!findModule) {
      throw new NotFoundException(
        `Sorry, we could not find a module with the ID ${addModulePermissionDto.module_id}. Please try again with a valid ID`,
      );
    }

    const findPermission = await this.permissionService.findOne(
      addModulePermissionDto.permission_id,
    );
    if (!findPermission) {
      throw new NotFoundException(
        `Sorry, we could not find a permission with the ID ${addModulePermissionDto.permission_id}. Please try again with a valid ID`,
      );
    }

    const findModulePermission = await this.model.findOne({
      where: {
        id: addModulePermissionDto.module_id,
        permissions: { id: addModulePermissionDto.permission_id },
      },
      relations: {
        permissions: true,
      },
    });

    if (findModulePermission) {
      throw new BadRequestException(
        'Sorry, we found a record with the values you provided. Try again with a valid values',
      );
    }

    return await this.manager
      .createQueryBuilder()
      .insert()
      .into('module_permission')
      .values({
        module_id: addModulePermissionDto.module_id,
        permission_id: addModulePermissionDto.permission_id,
      })
      .execute();
  }

  async removeModulePermission(
    removeModulePermissionDto: RemoveModulePermissionDto,
  ) {
    const findModule = await this.findOne(removeModulePermissionDto.module_id);
    if (!findModule) {
      throw new NotFoundException(
        `Sorry, we could not find a module with the ID ${removeModulePermissionDto.module_id}. Please try again with a valid ID`,
      );
    }

    const findPermission = await this.permissionService.findOne(
      removeModulePermissionDto.permission_id,
    );
    if (!findPermission) {
      throw new NotFoundException(
        `Sorry, we could not find a permission with the ID ${removeModulePermissionDto.permission_id}. Please try again with a valid ID`,
      );
    }

    const findModulePermission = await this.model.findOne({
      where: {
        id: removeModulePermissionDto.module_id,
        permissions: { id: removeModulePermissionDto.permission_id },
      },
      relations: {
        permissions: true,
      },
    });

    if (!findModulePermission) {
      throw new BadRequestException(
        'Sorry, we could not find a record with the values you provided. Try again with a valid values',
      );
    }

    findModule.permissions = findModule.permissions.filter((permission) => {
      return permission.id !== removeModulePermissionDto.permission_id;
    });

    await this.model.save(findModule);

    return {
      message:
        'The relationship between modules and permissions has been deleted',
    };
  }

  async findAll() {
    const module = await this.model.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return module;
  }

  async findOne(id: number) {
    const module = await this.model.findOne({
      where: { id },
      relations: { permissions: true, roles: true },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          id: true,
          name: true,
          description: true,
          code_resource: true,
        },
        roles: {
          id: true,
          name: true,
          description: true,
        },
      },
    });
    if (!module) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${id}. Try again with a valid ID`,
      );
    }
    return module;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    const module = await this.model.findOneBy({ id });
    if (!module) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${id}. Try again with a valid ID`,
      );
    }
    const updatedEntity = { ...module, ...updateModuleDto };
    const moduleUpdate = await this.model.save(updatedEntity);
    return moduleUpdate;
  }

  async remove(id: number) {
    const module = await this.model.findOneBy({ id });

    if (!module) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${id}. Try again with a valid ID`,
      );
    }

    const existsChild = await this.model
      .createQueryBuilder('module')
      .leftJoinAndSelect('module.children', 'children')
      .select(['module.id', 'children.id'])
      .where('module.id = :id', { id })
      .getMany();

    if (existsChild[0].children.length > 0) {
      throw new BadRequestException(
        `Sorry, we could not delete the module, because we found a child with the ID ${id}. Try again with a valid ID`,
      );
    }
    return this.model.delete(id);
  }
}
