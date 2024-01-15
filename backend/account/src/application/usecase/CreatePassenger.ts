import User from "../../domain/entity/User";
import Passenger from "../../domain/entity/Passenger";
import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

type Input = {
	name: string,
	email: string,
	document: string,
	password?: string
}

type Output = {
	passengerId: string
}

export default class CreatePassenger {
	private userRepository: UserRepository;
	private passengerRepository: PassengerRepository;

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.userRepository = repositoryFactory.createUserRepository();
		this.passengerRepository = repositoryFactory.createPassengerRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const passenger = Passenger.create(input.name, input.email, input.document);
		if (input.password) {
			const user = User.create(input.email, input.password, "pbkdf2");
			await this.userRepository.save(user);
		}
		await this.passengerRepository.save(Object.assign(input, passenger));
		return { passengerId: passenger.passengerId };
	}

}
