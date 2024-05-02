import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder implements Seeder {
  name = 'User';

  constructor(private readonly manager: EntityManager) {}

  async run(): Promise<void> {
    const hash = await bcrypt.hash(
      process.env.USER_ADMIN_PASSWORD,
      parseInt(process.env.JWT_SALT_OR_ROUNDS),
    );
    const users = [
      { name: 'Admin', email: process.env.USER_ADMIN_EMAIL, password: hash },
    ];

    await this.manager.save(User, users);
  }
}
