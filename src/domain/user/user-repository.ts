import User from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface UserRepository {
  save: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | undefined| null>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: any) => Promise<void>;
}
