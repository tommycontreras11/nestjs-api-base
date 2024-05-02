import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRole {
  constructor(
    @InjectRepository(UserRole) private readonly model: Repository<UserRole>,
  ) {}

  findAll() {
    return this.model.find({});
  }
}
