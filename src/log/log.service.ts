import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async findAll() {
    const logs = await this.logRepository.find({
      select: {
        id: true,
        description: true,
        action: true,
        table_name: true,
      },
    });
    return logs;
  }

  async findOne(id: number) {
    const log = await this.logRepository.findOne({
      where: { id },
      select: {
        id: true,
        description: true,
        action: true,
        table_name: true,
      },
    });
    if (!log) {
      throw new NotFoundException(
        `Sorry, we could not find the log with the ID ${id}. Please try again with a valid ID`
      );
    }
    return log;
  }
}
