export interface IGoogleUserPayload {
  email: string;
  id: string;
}

export default interface IGoogleProvider {
  getUserLoginData(token: string): Promise<IGoogleUserPayload>;
}
