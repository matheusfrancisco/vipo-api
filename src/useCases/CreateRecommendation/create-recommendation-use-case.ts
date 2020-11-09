import { UserRepository } from "../../domain/user/user-repository";
import User from "src/domain/user/user";

export class CreateRecommendationUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    numberOfPeople,
    howMuch,
    like,
  }: Record<string, string>) {
    try {
      const user = await this.userRepository.findByEmail(userEmail);

      if (!user) {
        throw new Error("User does not exist.");
      }

      await this.userRepository.insertAnswer({
        user,
        numberOfPeople,
        howMuch,
        like,
      });
    } catch (error) {
      throw error;
    }
  }
}
