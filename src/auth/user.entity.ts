import { Entity, BaseEntity, ObjectIdColumn, Column, ObjectID, UpdateDateColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true  })
  updatedAt?: Date;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}
