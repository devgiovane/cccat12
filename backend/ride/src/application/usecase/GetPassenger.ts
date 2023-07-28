import pgp from "pg-promise";
import PassengerRepository from "../repository/PassengerRepository";

type Input = {
	passengerId: string
}

type Output = {
	passengerId: string,
	name: string,
	email: string,
	document: string
}

export default class GetPassenger {

	constructor(
		private readonly passengerRepository: PassengerRepository
	) {
	}

	public async execute(input: Input): Promise<Output>  {
		const passenger = await this.passengerRepository.get(input.passengerId);
		return {
			passengerId: passenger.passengerId,
			name: passenger.name,
			email: passenger.email.value,
			document: passenger.document.value
		};
	}

}
