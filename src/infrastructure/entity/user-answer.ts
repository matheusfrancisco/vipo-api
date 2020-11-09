import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";

import { UserEntity } from "./user-entity";

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => UserEntity,
    (user) => user.answers
  )
  user!: UserEntity;

  @Column()
  numberOfPeople!: number;

  @Column()
  howMuch!: number;

  @Column()
  like!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }
}
