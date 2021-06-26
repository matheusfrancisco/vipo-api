export interface IUserFeedback {
  userId: number;
  venueId: number;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}
