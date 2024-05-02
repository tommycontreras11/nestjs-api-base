import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private readonly model: Repository<State>,
    private readonly countryService: CountryService,
  ) {}
  async create(createStateDto: CreateStateDto) {
    const findCountry = await this.countryService.findOne(
      +createStateDto.country_id,
    );
    if (!findCountry) {
      throw new NotFoundException(
        `Sorry, we could not find a country with the ID ${createStateDto.country_id}. Please, try again with a valid ID`,
      );
    }
    // const state = this.model.create(createStateDto);
    // state.country = findCountry;

    // return await this.model.save(state);
  }

  async findAll() {
    const states = await this.model.find({});
    return states;
  }

  async findOne(id: number) {
    const findState = await this.model.findOne({ where: { id } });
    if (!findState) {
      throw new NotFoundException(
        `Sorry, we could not find a state with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return findState;
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    const findState = await this.model.findOne({ where: { id } });
    if (!findState) {
      throw new NotFoundException(
        `Sorry, we could not find a state with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    // const state = { ...findState, ...updateStateDto };
    // return await this.model.save(state);
  }

  async remove(id: number) {
    const findState = await this.model.findOne({ where: { id } });
    if (!findState) {
      throw new NotFoundException(
        `Sorry, we could not find a state with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return await this.model.delete(id);
  }
}
