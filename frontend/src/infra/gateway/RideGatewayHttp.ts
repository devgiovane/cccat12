import Ride from "../../domain/entity/Ride.ts";
import HttpClient from "../http/HttpClient.ts";
import RideGateway, {CalculateRideInput, RequestRideInput} from "./RideGateway.ts";

export default class RideGatewayHttp implements RideGateway {

	constructor(
		private readonly httpClient: HttpClient
	) {
	}

	public async calculate(ride: Ride): Promise<number> {
		const input: CalculateRideInput = {
			positions: [
				{lat: ride.getFrom().getLat(), long: ride.getFrom().getLong(), date: new Date()},
				{lat: ride.getTo().getLat(), long: ride.getTo().getLong(), date: new Date()}
			]
		}
		const output = await this.httpClient.post(`${import.meta.env.VITE_API_URL}/ride/calculate`, input);
		return output.price;
	}

	public async request(ride: Ride): Promise<string> {
		const input: RequestRideInput = {
			passengerId: ride.getPassengerId(),
			from: {
				lat: ride.getFrom().getLat(),
				long: ride.getFrom().getLong()
			},
			to: {
				lat: ride.getTo().getLat(),
				long: ride.getTo().getLong()
			},
			date: new Date()
		}
		const output = await this.httpClient.post(`${import.meta.env.VITE_API_URL}/ride/request`, input);
		return output.rideId;
	}

}
