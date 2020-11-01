import User from "../../domain/user/user";
import { CustomerRepository } from "../../domain/user/user-repository";
import bcrypt from "bcrypt";

export interface CustomerResource {
  id: number;
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: CustomerRepository) {}

  public async cryptPass(password: string) {
    const hashPass = await bcrypt.hash(password, 8);
    return hashPass;
  }

  async execute({ name, email, password }: Record<string, string>) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    try {
      const hashPass = await this.cryptPass(password);
      const user = new User({ name, password: hashPass, email });
      await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
}
