import { Permission } from '../../permission/entities/permission.entity';
import { CommonEntity } from '../../../common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../../../authorization/role/entities/role.entity';

@Entity({ name: 'module' })
export class ModuleEntity extends CommonEntity {
  @Column({ type: 'varchar', unique: true, length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @ManyToOne(() => ModuleEntity, (module) => module.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent_id?: ModuleEntity;

  @OneToMany(() => ModuleEntity, (module) => module.parent_id)
  children: ModuleEntity[];

  @ManyToMany(() => Permission, (permission) => permission.modules, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'module_permission',
    joinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @ManyToMany(() => Role, (role) => role.modules, { onDelete: 'CASCADE' })
  roles: Role[];
}
