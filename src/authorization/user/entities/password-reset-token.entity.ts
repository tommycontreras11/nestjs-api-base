import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  user: User;

  @DeleteDateColumn()
  @JoinColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
