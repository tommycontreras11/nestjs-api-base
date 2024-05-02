import { CommonEntity } from '../../../common/entity/common.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { ModuleEntity } from '../../module/entities/module.entity';

@Entity({ name: 'permission' })
export class Permission extends CommonEntity {
  @Column({ unique: true })
  code_resource: string;

  @Column({ type: 'varchar', unique: true, length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @ManyToMany(() => ModuleEntity, (module) => module.permissions, { onDelete: 'CASCADE' })
  modules: ModuleEntity[];
}
