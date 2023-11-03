import Driver from "../../domain/entity/Driver";
import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";

type Input = {
	name: string
	email: string
	document: string
	carPlate: string
}

type Output = {
	driverId: string
}

export default class CreateDriver {
	private driverRepository: DriverRepository

	constructor(
		repositoryFactory: RepositoryFactory
	) {
		this.driverRepository = repositoryFactory.createDriverRepository();
	}

	public async execute(input: Input): Promise<Output>  {
		const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
		await this.driverRepository.save(driver);
		return { driverId: driver.driverId };
	}

}
