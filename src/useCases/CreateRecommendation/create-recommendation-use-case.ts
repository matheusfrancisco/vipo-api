import { UserRepository } from "../../domain/user/user-repository";
import UserAnswer, {IUserAnswer} from "../../domain/user/user-answer";

interface IEmail {
  userEmail: string;
}
export type ICreateRec = IUserAnswer & IEmail;

export class CreateRecommendationUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userEmail,
    numberOfPeople,
    howMuch,
    like,
  }: ICreateRec) {
    try {
      const user = await this.userRepository.findByEmail(userEmail);

      if (!user) {
        throw new Error("User does not exist.");
      }
      const userRecommendation = new UserAnswer({
        userId: user.id,
        numberOfPeople: numberOfPeople,
        howMuch: howMuch,
        like: like,
      })
      const recomentadions = [
        { "name": "Bar do jao", "description": "noite boa"},
        { "name": "Bar do jao", "description": "noite boa"},
        { "name": "Bar do jao", "description": "noite boa"},
      ]
      userRecommendation.addRecommendation(recomentadions)
      console.log(userRecommendation)
      await this.userRepository.insertAnswer({...userRecommendation.toRepository(), user});
      return recomentadions;
    } catch (error) {
      throw error;
    }
  }
}
