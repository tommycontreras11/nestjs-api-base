import { User } from '../../authorization/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
