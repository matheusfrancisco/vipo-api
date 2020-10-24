import { CustomerRepository } from "src/domain/user/user-repository";
import { UserEntity } from "./entity/user-entity";
import { Connection, getRepository } from "typeorm";
import User from "../domain/user/user";

export class PostgresCustomerRepository implements CustomerRepository {
  constructor(public connection: Connection) {}
  public async save({ name, email, password }: User): Promise<void> {
    const entity = {
      name: name,
      email: email.value,
      password: password
    };
    await getRepository(UserEntity).save(entity);
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const userRepository = await getRepository(UserEntity).findOne({
      email
    });
    if (userRepository) {
      return userRepository;
    }
  }
}
