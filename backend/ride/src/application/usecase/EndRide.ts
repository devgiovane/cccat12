import PaymentGateway from "../gateway/PaymentGateway";
import AccountGateway from "../gateway/AccountGateway";
import RideRepository from "../repository/RideRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	rideId: string,
	date: Date
}

export default class EndRide {
	private rideRepository: RideRepository;

	constructor(
		repositoryFactory: RepositoryFactory,
		private readonly accountGateway: AccountGateway,
		private readonly paymentGateway: PaymentGateway
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	public async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.end(input.date);
		await this.rideRepository.update(ride);
		const passenger = await this.accountGateway.getPassenger(ride.passengerId);
		await this.paymentGateway.process({
			name: passenger.name, email: passenger.email, amount: ride.calculate()
		});
	}

}
