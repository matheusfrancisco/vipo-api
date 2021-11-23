import { IEntityId } from "@domain/global";

export interface IRecommendation {
  name: string;
  description: string;
  openAt: string;
  id: number;
  instagram: string;
  location: string;
}
export interface UserRecommendation {
  userId: number;
  recommendations: IRecommendation[];
  userAnswer: number;
}

export interface IUserRecommendationData extends UserRecommendation {
  id: IEntityId;
}

export interface IRecommendationRepository {
  save(
    userRecommendation: UserRecommendation
  ): Promise<IUserRecommendationData>;
}
