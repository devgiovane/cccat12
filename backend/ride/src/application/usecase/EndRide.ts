import RideRepository from "../repository/RideRepository";

type Input = {
	rideId: string,
	date: Date
}

export default class EndRide {

	constructor(
		private readonly rideRepository: RideRepository
	) {
	}

	public async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.end(input.date);
		await this.rideRepository.update(ride);
	}

}
