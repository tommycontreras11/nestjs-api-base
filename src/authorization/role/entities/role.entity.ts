import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ModuleEntity } from '../../../authorization/module/entities/module.entity';

@Entity('roles')
export class Role extends CommonEntity {
  @Column({ type: 'varchar', unique: true, length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  description: string;

  @Column('boolean', { name: 'all_access' })
  all_access: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  user: User[];

  @ManyToMany(() => ModuleEntity, (module) => module.roles, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'role_module',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
  })
  modules: ModuleEntity[];
}
