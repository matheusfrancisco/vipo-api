import { Gender, IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import UserData from "@domain/user/user-data";
import IGoogleProvider, {
  IGoogleUserPayload
} from "@providers/GoogleProvider/models/IGoogleProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

const DEFAULT_BIRTHDATE = "01/01/1966";

interface IExecute {
  token: string;
  user: IUserData;
}

interface ICreateUserDTO {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

interface ITokenPayload {
  id: number;
  email: string;
}

export class SignWithGoogleUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private googleProvider: IGoogleProvider,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute(googleToken: string): Promise<IExecute> {
    const googlePayload = await this.googleProvider.getUserLoginData(
      googleToken
    );

    const user = await this.usersRepository.findByEmail(googlePayload.email);

    if (!user) return this.createNewUserAndLogIt(googlePayload);

    const token = await this.getToken({
      id: user.id,
      email: user.email
    });

    Reflect.deleteProperty(user, "password");

    return {
      token,
      user
    };
  }

  private async createNewUserAndLogIt({
    email,
    id,
    lastName,
    name
  }: IGoogleUserPayload) {
    const user = await this.createNewUser({
      email,
      lastName,
      name,
      password: id
    });

    const token = await this.getToken({
      id: user.id,
      email
    });

    Reflect.deleteProperty(user, "password");

    return {
      token,
      user
    };
  }

  private async createNewUser({
    email,
    name,
    lastName,
    password
  }: ICreateUserDTO): Promise<IUserData> {
    const newUser = new UserData({
      email,
      password,
      name,
      lastName,
      birthDate: new Date(DEFAULT_BIRTHDATE),
      gender: Gender.Neuter
    });

    return this.usersRepository.save(newUser);
  }

  private async getToken({ id, email }: ITokenPayload): Promise<string> {
    const tokenPayload = { id, email };

    const token = await this.tokenProvider.generateToken(tokenPayload);

    return token;
  }
}
