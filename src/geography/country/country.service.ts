import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private readonly model: Repository<Country>,
  ) {}
  async create(createCountryDto: CreateCountryDto) {
    const country = this.model.create(createCountryDto);
    return await this.model.save(country);
  }

  async findAll() {
    const countries = await this.model.find({});
    return countries;
  }

  async findOne(id: number) {
    const findCountry = await this.model.findOne({ where: { id } });
    if (!findCountry) {
      throw new NotFoundException(
        `Sorry, we could not find a country with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return findCountry;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const findCountry = await this.findOne(id); 
    if (!findCountry) {
      throw new NotFoundException(
        `Sorry, we could not find a country with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    
    const country = { ...findCountry, ...updateCountryDto };
    return await this.model.save(country);
  }

  async remove(id: number) {
    const findCountry = await this.findOne(id); 
    if (!findCountry) {
      throw new NotFoundException(
        `Sorry, we could not find a country with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return await this.model.delete(id);;
  }
}
