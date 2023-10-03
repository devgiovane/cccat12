import DriverGateway from "./DriverGateway.ts";
import HttpClient from "../http/HttpClient.ts";

export default class DriverGatewayHttp implements DriverGateway {

	constructor(
		private readonly httpClient: HttpClient
	) {
	}
	public async save(driver: any) {
		return await this.httpClient.post('http://localhost:3000/driver', driver);
	}
}
