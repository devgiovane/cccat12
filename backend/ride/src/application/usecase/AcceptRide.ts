import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	rideId: string,
	driverId: string,
	date: Date
}

export default class AcceptRide {
	private rideRepository: RideRepository;

	constructor(
		readonly repositoryFactory: RepositoryFactory
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	public async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.accept(input.driverId, input.date);
		await this.rideRepository.update(ride);
	}

}
