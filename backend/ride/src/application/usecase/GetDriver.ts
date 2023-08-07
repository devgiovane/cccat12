import DriverRepository from "../repository/DriverRepository";

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

	constructor(
		private readonly driverRepository: DriverRepository
	) {
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
