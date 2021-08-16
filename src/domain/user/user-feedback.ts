export interface IUserFeedback {
  userId: number;
  establishmentId: number;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}