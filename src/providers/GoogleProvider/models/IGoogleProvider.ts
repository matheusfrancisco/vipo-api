export interface IGoogleUserPayload {
  email: string;
  name: string;
  lastName: string;
  id: string;
}

export default interface IGoogleProvider {
  getUserLoginData(token: string): Promise<IGoogleUserPayload>;
}
