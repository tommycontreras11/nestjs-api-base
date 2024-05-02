import { City } from "../../../geography/city/entities/city.entity";
import { Country } from "../../../geography/country/entities/country.entity";
import { CommonEntity } from "../../../common/entity/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'states' })
export class State extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', name: 'country_id' })
  country_id: number;

  @ManyToOne(() => Country, (country) => country.iso2)
  @JoinColumn({ name: 'country_code' })
  country_code: string;

  @OneToMany(() => City, (city) => city.country_code)
  city: City[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  fips_code: string;

  @Column({ type: 'char', length: 2 })
  iso2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: string;

  @Column('boolean', { default: true, name: 'flag' })
  @JoinColumn({ name: 'flag' })
  flag: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wikiDataId: string;
}
