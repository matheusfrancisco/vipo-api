import { Gender } from "@domain/user/IUser";

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
}
