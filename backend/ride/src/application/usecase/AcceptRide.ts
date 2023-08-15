import RideRepository from "../repository/RideRepository";

type Input = {
	rideId: string,
	driverId: string,
	date: Date
}

// type Output = {
// 	rideId: string
// }

export default class AcceptRide {

	constructor(
		private readonly rideRepository: RideRepository
	) {
	}

	public async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.accept(input.driverId, input.date);
		await this.rideRepository.update(ride);
	}

}
