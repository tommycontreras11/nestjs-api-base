import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  RemoveEvent,
  EntityManager,
} from 'typeorm';

import { InjectEntityManager } from '@nestjs/typeorm';
import { Log } from './log/entities/log.entity';



@EventSubscriber()
export class EventEntitySubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.entityManager.connection.subscribers.push(this);
  }

  listenTo() {
    return Object; 
  }


  async beforeUpdate(event: UpdateEvent<any>) {
    const user_create_id = await this.getPreviowUsercreateId(
      event.metadata.tableName,
      event.entity.id,
    );
    if (user_create_id) {
      event.entity['user_create_id'] = user_create_id;
    }
    await this.entityManager.save(Log, {
      action: 'update',
      table_name: event.metadata.tableName,
      description: JSON.stringify(event.entity),
    });
  }

  async beforeRemove(event: RemoveEvent<any>) {
    await this.entityManager.save(Log, {
      action: 'remove',
      table_name: event.metadata.tableName,
      description: JSON.stringify(event.entity),
    });
  }
  async getPreviowUsercreateId(table: any, id: number) {
    const user = await this.entityManager
      .createQueryBuilder(table, 'entity')
      .select('user_create_id')
      .where('entity.id = :id', { id })
      .getRawOne();

    return user?.user_create_id ? user.user_create_id : null;
  }
}
