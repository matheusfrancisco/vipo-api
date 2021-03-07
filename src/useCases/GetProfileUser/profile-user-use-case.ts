import { UserRepository } from "@domain/user/user-repository";

interface IProfileUser {
  email: string;
}

export class ProfileUserUseCase {
  constructor(
    private userRepository: UserRepository,
  ) {}

  public async execute({
    email,
  }: IProfileUser): Promise<void> {

    const user = await this.userRepository.findAllProfileInformationsByEmail(email);
    // #TODO fix returning type
    return user;
  }
}
