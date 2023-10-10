import RideRepository from "../repository/RideRepository";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	rideId: string
}

type Output = {
	rideId: string,
	driverId?: string,
	status: string,
	requestDate: Date
	acceptDate?: Date,
	startDate?: Date,
	endDate?: Date,
	passengerName: string,
	driverName?: string
}

export default class GetRide {
	private rideRepository: RideRepository;
	private driverRepository: DriverRepository;
	private passengerRepository: PassengerRepository;

	constructor(
		readonly repositoryFactory: RepositoryFactory
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
		this.driverRepository = repositoryFactory.createDriverRepository();
		this.passengerRepository = repositoryFactory.createPassengerRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const ride = await this.rideRepository.get(input.rideId);
		let driver;
		if (ride.driverId) {
			driver = await this.driverRepository.get(ride.driverId);
		}
		const passenger = await this.passengerRepository.get(ride.passengerId);
		return {
			rideId: ride.rideId,
			driverId: ride.driverId,
			status: ride.status.getValue(),
			requestDate: ride.requestDate,
			acceptDate: ride.acceptDate,
			startDate: ride.startDate,
			endDate: ride.endDate,
			passengerName: passenger.name,
			driverName: driver?.name
		};
	}

}
