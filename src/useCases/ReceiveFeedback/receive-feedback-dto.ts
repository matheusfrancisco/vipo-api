export default interface IReceiveFeedbackDTO {
  userId: number;
  establishmentId: number;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
}
