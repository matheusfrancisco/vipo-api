import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentFeedback from "@domain/establishment-feedback/IEstablishmentFeedback";

export default interface IEstablishmentRepositoriesFeedback {
  create(feedback: EstablishmentFeedback): Promise<IEstablishmentFeedback>;
}
