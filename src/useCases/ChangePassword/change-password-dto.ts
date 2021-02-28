export default interface IChangePasswordDTO {
  userId: number;
  dbPasswordHash: string;
  password: string;
  newPassword: string;
}
