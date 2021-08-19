export default interface IReceiveFeedbackDTO {
  email: string;
  establishmentId: number;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
}
