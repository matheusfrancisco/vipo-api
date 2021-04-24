import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";

import { UserEntity } from "./user-entity";

interface Recommendation {
  name: string;
  description: string;
}

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false
  })
  recommendations!: Array<Recommendation>;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }
}
