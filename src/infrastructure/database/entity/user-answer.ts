import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";

import { UserEntity } from "./user-entity";

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(
    () => UserEntity,
    user => user.answers
  )
  user!: UserEntity;

  @Column({ nullable: false })
  numberOfPeople!: number;

  @Column({ nullable: false })
  howMuch!: string;

  @Column("simple-array", { nullable: false })
  like!: string[];

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }
}
