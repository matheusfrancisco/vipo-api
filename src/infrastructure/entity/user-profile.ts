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
import { UserEntity } from './user-entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("simple-array")
  musical!: string[];

  @Column("simple-array")
  foods!: string[];

  @Column("simple-array")
  drinks!: string[];

  @OneToOne(type => UserEntity)
  @JoinColumn()
  user!: UserEntity;

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
