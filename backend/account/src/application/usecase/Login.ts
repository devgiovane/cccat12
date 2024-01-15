import RepositoryFactory from "../factory/RepositoryFactory";
import UserRepository from "../repository/UserRepository";
import Token from "../../domain/service/Token";

type Input = {
	email: string,
	password: string
}

type Output = {
	token: string
}

export default class Login {
	private userRepository: UserRepository;

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.userRepository = repositoryFactory.createUserRepository();
	}

	public async execute(input: Input): Promise<Output> {
		const user = await this.userRepository.getByEmail(input.email);
		if (!user.validatePassword(input.password)) {
			throw new Error("authentication failed");
		}
		return {
			token: Token.create("secrete", user.email.getValue(), new Date())
		}
	}
}
