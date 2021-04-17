import User, { Gender, IUser } from "@domain/user/user";
import { ISavedUser, IUserRepository } from "@domain/user/user-repository";
import IGoogleProvider, {
  IGoogleUserPayload
} from "@providers/GoogleProvider/models/IGoogleProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

const DEFAULT_BIRTHDATE = "01/01/1966";

interface IExecute {
  token: string;
  user: {
    id: number;
    name: IUser["name"];
    lastName: IUser["lastName"];
    email: IUser["email"];
    gender: IUser["gender"];
    birthDate: IUser["birthDate"];
    createdAt: Date;
  };
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

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        birthDate: user.birthDate,
        createdAt: user.createdAt
      }
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

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        birthDate: user.birthDate,
        createdAt: user.createdAt
      }
    };
  }

  private async createNewUser({
    email,
    name,
    lastName,
    password
  }: ICreateUserDTO): Promise<ISavedUser> {
    const newUser = new User({
      email,
      password,
      name,
      lastName,
      birthDate: new Date(DEFAULT_BIRTHDATE),
      gender: Gender.Neuter
    });

    const user = await this.usersRepository.save(newUser.toRepository());

    return user;
  }

  private async getToken({ id, email }: ITokenPayload): Promise<string> {
    const tokenPayload = { id, email };

    const token = await this.tokenProvider.generateToken(tokenPayload);

    return token;
  }
}
