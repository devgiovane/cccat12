import Driver from "../../domain/entity/Driver.ts";

export type CreateDriverInput = {
	name: string,
	email: string,
	document: string,
	carPlate: string
}

export default interface DriverGateway {
	create(drive: Driver): Promise<string>;
}
