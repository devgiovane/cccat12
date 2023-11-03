import HttpClient from "../http/HttpClient";
import AccountGateway, { OutputDriver, OutputPassenger } from "../../application/gateway/AccountGateway";

export default class AccountGatewayHttp implements AccountGateway {

	constructor(private readonly httpClient: HttpClient) {
	}

	public async getDriver(driverId: string): Promise<OutputDriver> {
		return await this.httpClient.get(`http://localhost:3002/driver/${driverId}`);
	}

	public async getPassenger(passengerId: string): Promise<OutputPassenger> {
		return await this.httpClient.get(`http://localhost:3002/passenger/${passengerId}`);
	}

	public async createDriver(input: any): Promise<any> {
		return await this.httpClient.post('http://localhost:3002/driver', input);
	}

	public async createPassenger(input: any): Promise<any> {
		return await this.httpClient.post('http://localhost:3002/passenger', input);
	}

}
