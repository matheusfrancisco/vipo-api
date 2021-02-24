import { IUserProfile } from "src/domain/user/user-profile";

type ITastes = Omit<IUserProfile, "userId">;

export default interface IUpdateUserProfileDTO {
  userId: number;
  profileInformations: ITastes;
}
