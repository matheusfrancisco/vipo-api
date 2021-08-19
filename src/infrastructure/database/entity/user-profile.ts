import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterUpdate,
  OneToOne,
  JoinColumn
} from "typeorm";
import { UserEntity } from "./user-entity";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("simple-array", { nullable: true })
  musicals!: string[];

  @Column("simple-array", { nullable: true })
  foods!: string[];

  @Column("simple-array", { nullable: true })
  drinks!: string[];

  @Column()
  userId!: number;

  @OneToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: UserEntity;

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
