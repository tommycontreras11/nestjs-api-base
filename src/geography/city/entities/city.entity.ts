import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Country } from '../../../geography/country/entities/country.entity';
import { State } from '../../../geography/state/entities/state.entity';

@Entity({ name: 'cities' })
export class City extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', name: 'country_id' })
  country_id: number;

  @Column({ type: 'int', name: 'state_id' })
  state_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state_code: string;

  @ManyToOne(() => Country, (country) => country.iso2)
  @JoinColumn({ name: 'country_code' })
  country_code: string;

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
