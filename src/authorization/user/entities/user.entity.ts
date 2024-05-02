import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { PasswordResetToken } from './password-reset-token.entity';

@Entity('users')
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 256 })
  email: string;

  @Column({ type: 'varchar', length: 256, select: false })
  password: string;

  @Column('boolean', { default: true, name: 'active'  })
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

  @ManyToOne(() => User, (user) => user.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent_id?: User;

  @OneToMany(() => User, (user) => user.parent_id)
  children: User[];

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => PasswordResetToken, (token) => token.user)
  @JoinTable({ name: 'password_reset' })
  passwordResetTokens: PasswordResetToken[];
}
