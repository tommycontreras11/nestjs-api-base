import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotificationService } from '../../notification/notification.service';
import { paginate } from 'src/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginateOptions } from 'src/utils/pagination.interface';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private model: Repository<User>,
    private readonly notify: NotificationService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = await this.model.create({
      ...createUserDto,
      password: hash,
    });

    try {
      await this.model.save(user);
      delete user.password;
      const emailFrom = process.env.SMTP_FROM_ADDRESS;

      this.notify.sendEmail(
        emailFrom,
        user.email,
        'Account created',
        'hola como esta',
        '<h1>Holdad</h1>',
      );
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    params: FilterUserDto,
  ): Promise<{ data: User[]; total: number }> {
    const options: PaginateOptions<User> = {
      filterFn: (filter, qb) => {
        if (filter.email) {
          qb.andWhere('email = :email', { email: filter.email });
        }
        if (filter.name) {
          qb.andWhere('name = :name', { name: filter.name });
        }
        if (filter.startDate && filter.endDate) {
          qb.andWhere('created_at BETWEEN :start AND :end', {
            start: new Date(filter.startDate),
            end: new Date(filter.endDate),
          });
        }
        // Add more conditions for other filter fields as needed
      },
    };
    return await paginate(this.model, { ...params, filter: params }, options);
  }

  async findOne(id: number) {
    const user = await this.model.findOne({
      where: { id },
      relations: {
        roles: {
          modules: {
            permissions: true,
            children: { permissions: true },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: {
          id: true,
          name: true,
          description: true,
          modules: {
            id: true,
            name: true,
            description: true,
            children: {
              id: true,
              name: true,
              description: true,
              permissions: {
                id: true,
                name: true,
                description: true,
                code_resource: true,
              },
            },
            permissions: {
              id: true,
              name: true,
              description: true,
              code_resource: true,
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Sorry, we could not find the user with the ID ${id}. Please try again with a valid ID`,
      );
    }
    return user;
  }

  login(email: string) {
    return this.model.findOne({
      where: { email },
      select: ['email', 'id', 'password'],
    });
  }

  async update(id: number, userDto: UpdateUserDto) {
    const user = await this.model.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(
        `Sorry, we could not find a user with the ID ${id}. Please try again with a valid ID`,
      );
    const updatedEntity = { ...user, ...userDto };
    const userUpdate = await this.model.save(updatedEntity);
    delete userUpdate.password;
    return userUpdate;
  }

  async remove(id: number) {
    const user = await this.model.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(
        `Sorry, we could not find a user with the ID ${id}. Please try again with a valid ID`,
      );

    return this.model.softRemove(user);
  }
}
