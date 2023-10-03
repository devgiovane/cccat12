import Passenger from "../../domain/entity/Passenger.ts";

export type CreatePassengerInput = {
	name: string,
	email: string,
	document: string
}

export default interface PassengerGateway {
	create(passenger: Passenger): Promise<string>;
}
