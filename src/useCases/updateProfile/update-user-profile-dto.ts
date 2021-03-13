import { IUserProfile } from "src/domain/user/user-profile";

type ITastes = Omit<IUserProfile, "user">;

export default interface IUpdateUserProfileDTO {
  userId: number;
  profileInformations: ITastes;
}
