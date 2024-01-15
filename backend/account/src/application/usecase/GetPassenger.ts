import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

type Input = {
	passengerId: string
}

type Output = {
	passengerId: string,
	name: string,
	email: string,
	document: string,
	userId: string
}

export default class GetPassenger {
	private userRepository: UserRepository
	private passengerRepository: PassengerRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.userRepository = repositoryFactory.createUserRepository();
		this.passengerRepository = repositoryFactory.createPassengerRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const passenger = await this.passengerRepository.get(input.passengerId);
		const user = await this.userRepository.getByEmail(passenger.email.getValue());
		return {
			passengerId: passenger.passengerId,
			name: passenger.name,
			email: passenger.email.getValue(),
			document: passenger.document.getValue(),
			userId: user.userId
		};
	}

}
