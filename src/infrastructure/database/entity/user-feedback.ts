import { UserEntity } from "@infrastructure/database/entity/user-entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("user-feedback")
export class UserFeedback {
  @Column({
    name: "user_id"
  })
  userId!: number;

  @ManyToOne(
    () => UserEntity,
    user => user.id,
    { primary: true }
  )
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @PrimaryColumn()
  @Column()
  venueId!: number;

  @Column()
  rating!: number;

  @Column({ name: "best_rated_item" })
  bestRatedItem!: string;

  @Column({ name: "least_rated_item" })
  leastRatedItem!: string;

  @Column()
  comments?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;
}
