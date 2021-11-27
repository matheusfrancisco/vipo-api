import { IRecommendation } from "@domain/recommendation/recommendation";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert
} from "typeorm";

@Entity()
export class UserRecommendation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  userAnswer!: number;

  @Column("simple-array", { nullable: false })
  recommendations!: IRecommendation[];

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }
}
