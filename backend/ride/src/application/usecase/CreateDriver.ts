import Driver from "../../domain/Driver";
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

	constructor(
		private readonly driverRepository: DriverRepository
	) {
	}

	public async execute(input: Input): Promise<Output>  {
		const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
		await this.driverRepository.save(driver);
		return { driverId: driver.driverId };
	}

}
