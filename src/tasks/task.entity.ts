import { Entity, BaseEntity, ObjectIdColumn, Column, ObjectID, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true  })
  updatedAt?: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

}
