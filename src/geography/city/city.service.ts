import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { StateService } from '../state/state.service';
import { CountryService } from '../country/country.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly model: Repository<City>,
    private readonly stateService: StateService,
    private readonly countryService: CountryService,
  ) {}
  async create(createCityDto: CreateCityDto) {
    const findCountry = await this.countryService.findOne(
      +createCityDto.country_id,
    );
    if (!findCountry) {
      throw new NotFoundException(
        `Sorry, we could not find a country with the ID ${createCityDto.country_id}. Please, try again with a valid ID`,
      );
    }

    const findState = await this.stateService.findOne(+createCityDto.state_id);
    if (!findState) {
      throw new NotFoundException(
        `Sorry, we could not find a state with the ID ${createCityDto.state_id}. Please, try again with a valid ID`,
      );
    }

    // const city = this.model.create(createCityDto);
    // city.country = findCountry;
    // city.state = findState;

    // return await this.model.save(city);
  }

  async findAll() {
    const cities = await this.model.find({});
    return cities;
  }

  async findOne(id: number) {
    const findCity = await this.model.findOne({ where: { id } });
    if (!findCity) {
      throw new NotFoundException(
        `Sorry, we could not find a city with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return findCity;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const findCity = await this.model.findOne({ where: { id } });
    if (!findCity) {
      throw new NotFoundException(
        `Sorry, we could not find a city with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    // const city = { ...findCity, ...updateCityDto };
    // city.country_id = updateCityDto.country_id;
    // city.state_id = updateCityDto.state_id;
    // console.log(city);
    // return await this.model.save(city);
  }

  async remove(id: number) {
    const findCity = await this.model.findOne({ where: { id } });
    if (!findCity) {
      throw new NotFoundException(
        `Sorry, we could not find a city with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return await this.model.delete(id);
  }
}
