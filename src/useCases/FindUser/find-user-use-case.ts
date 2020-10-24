import User from "../../domain/user/user";
import { CustomerRepository } from "../../domain/user/user-repository";
import bcrypt from "bcrypt";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class FindUserUseCase {
  constructor(private userRepository: CustomerRepository) {}

  public async cryptPass(password: string) {
    const hashPass = await bcrypt.hash(password, 8);
    return hashPass;
  }

  async execute({ name, email }: Record<string, string>) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
