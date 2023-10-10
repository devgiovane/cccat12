import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	rideId: string,
	date: Date
}

export default class EndRide {
	private rideRepository: RideRepository;

	constructor(
		readonly repositoryFactory: RepositoryFactory
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	public async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.end(input.date);
		await this.rideRepository.update(ride);
	}

}
