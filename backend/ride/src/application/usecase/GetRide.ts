import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../gateway/AccountGateway";

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

	constructor(
		repositoryFactory: RepositoryFactory,
		private readonly accountGateway: AccountGateway
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const ride = await this.rideRepository.get(input.rideId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountGateway.getDriver(ride.driverId);
		}
		const passenger = await this.accountGateway.getPassenger(ride.passengerId);
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
