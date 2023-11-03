export type OutputPassenger = {
	passengerId: string
	name: string,
	email: string,
	document: string
}

export type OutputDriver = {
	driverId: string
	name: string,
	email: string,
	document: string,
	carPlate: string
}

export default interface AccountGateway {
	getPassenger(passengerId: string): Promise<OutputPassenger>;
	createPassenger(input: any): Promise<any>;
	getDriver(driverId: string): Promise<OutputDriver>;
	createDriver(input: any): Promise<any>;
}
