import DriverRepository from "../repository/DriverRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

type Input = {
	driverId: string
}

type Output = {
	driverId: string,
	name: string,
	email: string,
	document: string,
	carPlate: string
}

export default class GetDriver {
	private driverRepository: DriverRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.driverRepository = repositoryFactory.createDriverRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const driver = await this.driverRepository.get(input.driverId);
		return {
			driverId: driver.driverId,
			name: driver.name,
			email: driver.email.getValue(),
			document: driver.document.getValue(),
			carPlate: driver.plate.getValue()
		};
	}

}
