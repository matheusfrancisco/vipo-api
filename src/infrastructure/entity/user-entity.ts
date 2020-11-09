import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterUpdate,
  OneToMany,
} from "typeorm";
import { UserAnswer } from "./user-answer";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  name!: string;

  @OneToMany(
    () => UserAnswer,
    (answer) => answer.user
  )
  answers!: UserAnswer[];

  @Column()
  password!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @AfterUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }
}
