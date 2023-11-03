import Ride from "../../domain/entity/Ride";
import Coord from "../../domain/entity/Coord";
import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	passengerId: string,
	from: { lat: number, long: number },
	to: { lat: number, long: number },
	date: Date
}

type Output = {
	rideId: string
}


export default class RequestRide {
	private rideRepository: RideRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	public async execute(input: Input): Promise<Output> {
		const ride = Ride.create(
			input.passengerId,
			new Coord(input.from.lat, input.from.long), new Coord(input.to.lat, input.to.long), input.date
		);
		await this.rideRepository.save(ride);
		return {
			rideId: ride.rideId
		}
	}

}
