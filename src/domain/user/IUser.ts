export enum Gender {
  Male = "male",
  Female = "female",
  Neuter = "neuter"
}

export default interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  resetPasswordToken?: string;
}
