import { ServiceError } from "@errors/service-error";
import { IUserRepository } from "../../domain/user/user-repository";
import UserAnswer, { IUserAnswer } from "../../domain/user/user-answer";

interface IEmail {
  userEmail: string;
}
export type ICreateRec = IUserAnswer & IEmail;

interface IRecommendation {
  name: string;
  description: string;
}

export class CreateRecommendationUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userEmail,
    numberOfPeople,
    howMuch,
    like
  }: ICreateRec): Promise<IRecommendation[]> {
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new ServiceError("User does not exist.");
    }
    const userRecommendation = new UserAnswer({
      userId: user.id,
      numberOfPeople,
      howMuch,
      like
    });

    const recommendations = [
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" }
    ];
    userRecommendation.addRecommendation(recommendations);

    await this.userRepository.insertAnswer({
      ...userRecommendation.toRepository(),
      user
    });

    console.log(recommendations);

    return recommendations;
  }
}
