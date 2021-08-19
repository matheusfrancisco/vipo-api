import EstablishmentFeedback, {
  IEstablishmentFeedbackArgs
} from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentFeedback from "@domain/establishment-feedback/IEstablishmentFeedback";
import IEstablishmentFeedbacksRepository from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import MockUserData from "@domain/user/mocks/mock-user-data";

export default class MockEstablishmentFeedbacksRepository
  implements IEstablishmentFeedbacksRepository {
  private feedbacks: IEstablishmentFeedbackArgs[] = [];

  public async create({
    userId,
    establishmentId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: EstablishmentFeedback): Promise<IEstablishmentFeedback> {
    const user = new MockUserData();

    const newFeedback: IEstablishmentFeedback = {
      userId,
      user: {
        ...user,
        id: userId
      },
      establishmentId,
      rating,
      bestRatedItem,
      leastRatedItem,
      comments,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.feedbacks.push(newFeedback);

    return newFeedback;
  }
}
