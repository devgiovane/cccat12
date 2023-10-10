import Passenger from "../../domain/entity/Passenger";
import RepositoryFactory from "../factory/RepositoryFactory";
import PassengerRepository from "../repository/PassengerRepository";

type Input = {
	name: string,
	email: string,
	document: string
}

type Output = {
	passengerId: string
}

export default class CreatePassenger {
	private passengerRepository: PassengerRepository;

	constructor(
		readonly repositoryFactory: RepositoryFactory
	) {
		this.passengerRepository = repositoryFactory.createPassengerRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const passenger = Passenger.create(input.name, input.email, input.document);
		await this.passengerRepository.save(Object.assign(input, passenger));
		return { passengerId: passenger.passengerId };
	}

}
