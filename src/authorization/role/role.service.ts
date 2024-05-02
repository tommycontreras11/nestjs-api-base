import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateDuplicateRoleDto } from './dto/create-duplicate-role.dto';
import { AddRoleModuleDto } from './dto/add-role-module.dto';
import { ModuleService } from '../module/module.service';
import { RemoveRoleModuleDto } from './dto/remove-role-module.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly model: Repository<Role>,
    private readonly moduleService: ModuleService,
    private readonly manager: EntityManager,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.model.create(createRoleDto);
    return await this.model.save(role);
  }

  async duplicate(createDuplicateRoleDto: CreateDuplicateRoleDto) {
    const roles = await this.model.findOne({
      where: { id: createDuplicateRoleDto.role_id },
      relations: { modules: true },
      select: {
        modules: {
          id: true,
        },
      },
    });

    if (!roles) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${createDuplicateRoleDto.role_id}. Please try again with a valid ID`,
      );
    }
    const newRole = this.model.create({
      name: createDuplicateRoleDto.name,
      description: createDuplicateRoleDto.name,
      active: roles.active,
    });

    const roleCreated = await this.model.save(newRole);

    const role_module = roles.modules.map((module) => {
      return {
        role_id: roleCreated.id,
        module_id: module.id,
      };
    });

    await this.manager
      .createQueryBuilder()
      .insert()
      .into('role_module')
      .values(role_module)
      .execute();

    return await this.findOne(roleCreated.id);
  }

  async addRoleModule(addRoleModuleDto: AddRoleModuleDto) {
    const findRole = await this.findOne(addRoleModuleDto.role_id);
    if (!findRole) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${addRoleModuleDto.role_id}. Please try again with a valid ID`,
      );
    }

    const findModule = await this.moduleService.findOne(
      addRoleModuleDto.module_id,
    );
    if (!findModule) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${addRoleModuleDto.module_id}. Please try again with a valid ID`,
      );
    }

    const duplicateRoleModule = await this.model.findOne({
      where: {
        id: addRoleModuleDto.role_id,
        modules: { id: addRoleModuleDto.module_id },
      },
      relations: { modules: true },
    });

    if (duplicateRoleModule) {
      throw new BadRequestException(
        `Sorry, we found a record with the values you provided. Please try again with a valid values`,
      );
    }

    return await this.manager
      .createQueryBuilder()
      .insert()
      .into('role_module')
      .values({
        role_id: addRoleModuleDto.role_id,
        module_id: addRoleModuleDto.module_id,
      })
      .execute();
  }

  async removeRoleModule(removeRoleModuleDto: RemoveRoleModuleDto) {
    const findRole = await this.findOne(removeRoleModuleDto.role_id);
    if (!findRole) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${removeRoleModuleDto.role_id}. Please try again with a valid ID`,
      );
    }

    const findModule = await this.moduleService.findOne(
      removeRoleModuleDto.module_id,
    );
    if (!findModule) {
      throw new NotFoundException(
        `Sorry, we could not find the module with the ID ${removeRoleModuleDto.module_id}. Please try again with a valid ID`,
      );
    }

    const findRoleModule = await this.model.findOne({
      where: {
        id: removeRoleModuleDto.role_id,
        modules: { id: removeRoleModuleDto.module_id },
      },
      relations: { modules: true },
    });

    if (!findRoleModule) {
      throw new BadRequestException(
        `Sorry, we could not find a record with the values you provided. Please try again with a valid values`,
      );
    }

    findRole.modules = findRole.modules.filter((module) => {
      return module.id !== removeRoleModuleDto.module_id;
    });

    await this.model.save(findRole);

    return {
      message: 'The relationship between roles and modules has been deleted',
    };
  }

  async findAll() {
    const role = await this.model.find({
      select: {
        id: true,
        name: true,
        description: true,
        all_access: true,
      },
    });

    return role;
  }

  async findOne(id: number) {
    const role = await this.model.findOne({
      where: { id },
      relations: { modules: true },
      select: {
        id: true,
        name: true,
        description: true,
        all_access: true,
        modules: {
          id: true,
          name: true,
          description: true,
          children: true,
        },
      },
    });
    if (!role) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${id}. Please try again with a valid ID`,
      );
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.model.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${id}. Please try again with a valid ID`,
      );
    }
    const updatedEntity = { ...role, ...updateRoleDto };
    const roleUpdate = await this.model.save(updatedEntity);
    return roleUpdate;
  }

  async remove(id: number) {
    const role = await this.model.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(
        `Sorry, we could not find the role with the ID ${id}. Please try again with a valid ID`,
      );
    }
    return await this.model.delete(id);
  }
}
