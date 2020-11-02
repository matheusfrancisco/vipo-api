import User from "./user";
import UserProfile from "./user-profile";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface UserRepository {
  save: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | undefined>;
  updateUserProfile: (userProfile: any) => Promise<any>;
}
