import Customer from "./user";
import UserProfile from "./user-profile";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | undefined>;
  updateUserProfile: (userProfile: UserProfile) => Promise<any>;
}
