import IProfile from "@domain/profile/IProfile";

type ITastes = Omit<IProfile, "user">;

export default interface IUpdateUserProfileDTO {
  userId: number;
  profileInformations: ITastes;
}
