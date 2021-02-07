import User, { IUser } from "../../domain/user/user";
import { UserRepository } from "../../domain/user/user-repository";
import bcrypt from "bcrypt";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async cryptPass(password: string) {
    const hashPass = await bcrypt.hash(password, 8);
    return hashPass;
  }

  async execute({ name, email, password, lastName, birthDate, gender }: IUser) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    try {
      const hashPass = await this.cryptPass(password);
      const user = new User({ name,
          password: hashPass,
          email,
          lastName,
          gender,
          birthDate,
        });
      await this.userRepository.save({ ...user.toRepository()});
    } catch (error) {
      throw error;
    }
  }
}
