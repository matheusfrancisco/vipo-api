import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import MockEstablishmentFeedback from "@domain/establishment-feedback/mocks/mock-establishment-feedback";
import MockEstablishmentFeedbacksRepository from "@domain/establishment-feedback/mocks/mock-establishment-feedbacks-repository";
import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";

const getUseCase = () => {
  const usersRepository = new MockUserRepository();
  const feedbackRepository = new MockEstablishmentFeedbacksRepository();

  const useCase = new ReceiveFeedbackUseCase(
    usersRepository,
    feedbackRepository
  );

  return { usersRepository, feedbackRepository, useCase };
};

describe("Profile User Use Case", () => {
  it("should throw if the user doesnt exist", async () => {
    const { useCase } = getUseCase();

    const feedback = new EstablishmentFeedback(new MockEstablishmentFeedback());

    await expect(
      useCase.execute({
        ...feedback,
        email: "random@email.com"
      })
    ).rejects.toThrow();
  });

  it("should register the feedback correctly", async () => {
    const { useCase, usersRepository } = getUseCase();

    const user = new UserData(new MockUserData());
    await usersRepository.save(user);

    const feedback = new EstablishmentFeedback(new MockEstablishmentFeedback());

    await expect(
      useCase.execute({
        ...feedback,
        email: user.email
      })
    ).resolves.not.toBeDefined();
  });
});
