import { IUserRepository } from "../../domain/user/user-repository";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email }: Record<string, string>) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
