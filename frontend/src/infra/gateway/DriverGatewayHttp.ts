import HttpClient from "../http/HttpClient.ts";
import Driver from "../../domain/entity/Driver.ts";
import DriverGateway, {CreateDriverInput} from "./DriverGateway.ts";

export default class DriverGatewayHttp implements DriverGateway {

	constructor(
		private readonly httpClient: HttpClient
	) {
	}

	public async create(driver: Driver) {
		const input: CreateDriverInput = {
			name: driver.getName().getValue(),
			email: driver.getEmail().getValue(),
			document: driver.getDocument().getValue(),
			carPlate: driver.getCarPlate().getValue()
		}
		const driverData = await this.httpClient.post('http://localhost:3000/driver', input);
		return driverData.driverId;
	}
}
