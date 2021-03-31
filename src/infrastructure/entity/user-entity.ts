import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterUpdate,
  OneToMany
} from "typeorm";
import { UserAnswer } from "./user-answer";

export enum Gender {
  Male = "male",
  Female = "female",
  Neuter = "neuter"
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true
  })
  email!: string;

  @Column({
    nullable: false
  })
  name!: string;

  @Column({
    nullable: false
  })
  lastName!: string;

  @Column({
    nullable: false,
    type: "timestamp without time zone"
  })
  birthDate!: Date;

  @Column({
    type: "enum",
    enum: Gender,
    nullable: false
  })
  gender!: Gender;

  @OneToMany(
    () => UserAnswer,
    answer => answer.user
  )
  answers!: UserAnswer[];

  @Column()
  password!: string;

  @Column({
    name: "reset_password_token",
    nullable: true
  })
  resetPasswordToken?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }

  @AfterUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }
}
