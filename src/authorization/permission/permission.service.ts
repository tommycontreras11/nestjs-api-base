import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly model: Repository<Permission>,
  ) {}

  findAll() {
    return this.model.find({
      select: {
        id: true,
        name: true,
        description: true,
        code_resource: true,
      },
    });
  }

  async findOne(id: number) {
    const permission = await this.model.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        code_resource: true,
      },
    });
    if (!permission) {
      throw new NotFoundException(
        `Sorry, we could not find the permission with the ID ${id}. Try again with a valid ID`,
      );
    }
    return permission;
  }
}
