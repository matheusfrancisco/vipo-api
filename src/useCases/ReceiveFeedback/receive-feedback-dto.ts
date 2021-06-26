export default interface IReceiveFeedbackDTO {
  userId: number;
  venueId: number;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
}
