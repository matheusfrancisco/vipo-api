import Customer from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | undefined>;
}
