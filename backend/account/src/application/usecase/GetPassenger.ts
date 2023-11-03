import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";

type Input = {
	passengerId: string
}

type Output = {
	passengerId: string,
	name: string,
	email: string,
	document: string
}

export default class GetPassenger {
	private passengerRepository: PassengerRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.passengerRepository = repositoryFactory.createPassengerRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const passenger = await this.passengerRepository.get(input.passengerId);
		return {
			passengerId: passenger.passengerId,
			name: passenger.name,
			email: passenger.email.getValue(),
			document: passenger.document.getValue()
		};
	}

}
