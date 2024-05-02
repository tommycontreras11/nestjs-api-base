import { City } from '../../../geography/city/entities/city.entity';
import { State } from '../../../geography/state/entities/state.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../../authorization/user/entities/user.entity';

@Entity({ name: 'countries' })
export class Country  {
  @Generated()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => State, (state) => state.country_code)
  states: State[];

  @OneToMany(() => City, (city) => city.country_code)
  city: City[];

  @Column({ type: 'char', length: 3, nullable: true })
  numeric_code: string;

  @Column({ type: 'char', length: 3 })
  iso3: string;

  @PrimaryColumn({ type: 'char', length: 2 })
  iso2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phonecode: string;

  @Column({ type: 'varchar', length: 255 })
  capital: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currency_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currency_symbol: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tld: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  native: string;

  @Column({ type: 'varchar', length: 255 })
  region: string;

  @Column({ type: 'varchar', length: 255 })
  subregion: string;

  @Column({ type: 'text', nullable: true })
  timezones: string;

  @Column({ type: 'text', nullable: true })
  translations: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emoji: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emojiU: string;

  @Column('boolean', { default: true, name: 'active' })
  @JoinColumn({ name: 'active' })
  active: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_create_id' })
  user_create_id: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_update_id' })
  user_update_id: User;

  @CreateDateColumn()
  @JoinColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn()
  @JoinColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn()
  @JoinColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @Column('boolean', { default: true, name: 'flag' })
  @JoinColumn({ name: 'flag' })
  flag: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wikiDataId: string;
}
