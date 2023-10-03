import HttpClient from "../http/HttpClient.ts";
import Passenger from "../../domain/entity/Passenger.ts";
import PassengerGateway, {CreatePassengerInput} from "./PassengerGateway.ts";

export default class PassengerGatewayHttp implements PassengerGateway {

	constructor(
		private readonly httpClient: HttpClient
	) {
	}

	public async create(passenger: Passenger) {
		const input: CreatePassengerInput = {
			name: passenger.getName().getValue(),
			email: passenger.getEmail().getValue(),
			document: passenger.getDocument().getValue()
		};
		const passengerData = await this.httpClient.post('http://localhost:3000/passenger', input);
		return passengerData.passengerId;
	}
}
