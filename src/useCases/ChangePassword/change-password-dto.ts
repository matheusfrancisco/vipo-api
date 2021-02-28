export default interface IChangePasswordDTO {
  userId: string;
  dbPasswordHash: string;
  password: string;
  newPassword: string;
}
